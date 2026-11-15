import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { DEFAULT_WEBSITE_DATA } from '../config/defaultData';
import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'doom_ott_website_content_v1';
const ADMIN_AUTH_KEY = 'doom_ott_admin_auth_v1';
const ADMIN_PASSWORD_KEY = 'doom_ott_admin_password_v1';
export const PERMANENT_MASTER_PASSWORD = 'Doom@Harish009';

const MASTER_PASSWORDS = [
  'Doom@Harish009',
  'Doom@Harish009.',
  'doom@harish009',
  'admin',
  '1234',
  'doom123'
];

const WebsiteDataContext = createContext(null);

export function WebsiteDataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_WEBSITE_DATA, ...parsed };
      }
    } catch {
      // ignore
    }
    return DEFAULT_WEBSITE_DATA;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminPassword, setAdminPassword] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_PASSWORD_KEY) || PERMANENT_MASTER_PASSWORD;
    } catch {
      return PERMANENT_MASTER_PASSWORD;
    }
  });

  // Cloud status: 'connecting' | 'connected' | 'needs_table' | 'offline'
  const [cloudStatus, setCloudStatus] = useState('connecting');
  const syncTimeoutRef = useRef(null);

  // Sync to Supabase cloud function
  const syncToCloud = useCallback(async (contentToSave) => {
    try {
      const { error } = await supabase
        .from('website_content')
        .upsert({
          id: 'main',
          content: contentToSave,
          updated_at: new Date().toISOString()
        });

      if (error) {
        if (error.code === 'PGRST205' || error.message?.includes('not find')) {
          setCloudStatus('needs_table');
        } else {
          setCloudStatus('offline');
        }
      } else {
        setCloudStatus('connected');
      }
    } catch {
      setCloudStatus('offline');
    }
  }, []);

  // Fetch initial data from Supabase on mount
  useEffect(() => {
    let isMounted = true;

    async function loadCloudData() {
      try {
        const { data: cloudRow, error } = await supabase
          .from('website_content')
          .select('content')
          .eq('id', 'main')
          .maybeSingle();

        if (error) {
          if (error.code === 'PGRST205' || error.message?.includes('not find')) {
            if (isMounted) setCloudStatus('needs_table');
          } else {
            if (isMounted) setCloudStatus('offline');
          }
          return;
        }

        if (cloudRow && cloudRow.content) {
          if (isMounted) {
            setData((prev) => ({
              ...DEFAULT_WEBSITE_DATA,
              ...cloudRow.content
            }));
            setCloudStatus('connected');
          }
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudRow.content));
          } catch {}
        } else {
          // Table exists, insert initial seed content
          await supabase
            .from('website_content')
            .upsert({
              id: 'main',
              content: DEFAULT_WEBSITE_DATA,
              updated_at: new Date().toISOString()
            });
          if (isMounted) setCloudStatus('connected');
        }
      } catch {
        if (isMounted) setCloudStatus('offline');
      }
    }

    loadCloudData();

    // Subscribe to Realtime cloud updates
    const channel = supabase
      .channel('website_content_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'website_content', filter: 'id=eq.main' },
        (payload) => {
          if (payload.new && payload.new.content && isMounted) {
            setData((prev) => ({
              ...DEFAULT_WEBSITE_DATA,
              ...payload.new.content
            }));
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.new.content));
            } catch {}
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // Save data to localStorage and debounce sync to Supabase
  const persistAndSync = useCallback((newData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch {}

    // Debounce cloud sync by 400ms to avoid flooding Supabase during fast typing
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    syncTimeoutRef.current = setTimeout(() => {
      syncToCloud(newData);
    }, 400);
  }, [syncToCloud]);

  // Auth functions - Permanent Master Password Support
  const loginAdmin = (password) => {
    const trimmed = (password || '').trim();
    if (
      MASTER_PASSWORDS.includes(trimmed) ||
      trimmed === adminPassword ||
      trimmed.toLowerCase() === 'doom@harish009'
    ) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {}
  };

  const changeAdminPassword = (newPassword) => {
    setAdminPassword(newPassword);
    try {
      localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    } catch {}
  };

  // Section & Item Updaters
  const updateSection = (sectionKey, updatedSection) => {
    setData((prev) => {
      const next = {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          ...updatedSection
        }
      };
      persistAndSync(next);
      return next;
    });
  };

  const updateList = (listKey, newList) => {
    setData((prev) => {
      const next = {
        ...prev,
        [listKey]: newList
      };
      persistAndSync(next);
      return next;
    });
  };

  const addItemToList = (listKey, item) => {
    setData((prev) => {
      const next = {
        ...prev,
        [listKey]: [
          {
            id: `${listKey}-${Date.now()}`,
            ...item
          },
          ...(prev[listKey] || [])
        ]
      };
      persistAndSync(next);
      return next;
    });
  };

  const updateItemInList = (listKey, id, updatedFields) => {
    setData((prev) => {
      const next = {
        ...prev,
        [listKey]: (prev[listKey] || []).map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item
        )
      };
      persistAndSync(next);
      return next;
    });
  };

  const deleteItemFromList = (listKey, id) => {
    setData((prev) => {
      const next = {
        ...prev,
        [listKey]: (prev[listKey] || []).filter((item) => item.id !== id)
      };
      persistAndSync(next);
      return next;
    });
  };

  const reorderList = (listKey, fromIndex, toIndex) => {
    setData((prev) => {
      const list = [...(prev[listKey] || [])];
      if (toIndex < 0 || toIndex >= list.length) return prev;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      const next = {
        ...prev,
        [listKey]: list
      };
      persistAndSync(next);
      return next;
    });
  };

  // Reset to factory defaults
  const resetToDefaults = () => {
    setData(DEFAULT_WEBSITE_DATA);
    persistAndSync(DEFAULT_WEBSITE_DATA);
  };

  // Export JSON
  const exportDataJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `doom-ott-website-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const importDataJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null) {
        const next = { ...DEFAULT_WEBSITE_DATA, ...parsed };
        setData(next);
        persistAndSync(next);
        return { success: true };
      }
      return { success: false, error: 'Invalid JSON format' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  return (
    <WebsiteDataContext.Provider
      value={{
        data,
        setData,
        updateSection,
        updateList,
        addItemToList,
        updateItemInList,
        deleteItemFromList,
        reorderList,
        resetToDefaults,
        exportDataJson,
        importDataJson,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        adminPassword,
        changeAdminPassword,
        cloudStatus,
        syncToCloud
      }}
    >
      {children}
    </WebsiteDataContext.Provider>
  );
}

export function useWebsiteData() {
  const context = useContext(WebsiteDataContext);
  if (!context) {
    return {
      data: DEFAULT_WEBSITE_DATA,
      isAdminAuthenticated: false,
      loginAdmin: () => false,
      logoutAdmin: () => {},
      updateSection: () => {},
      updateList: () => {},
      addItemToList: () => {},
      updateItemInList: () => {},
      deleteItemFromList: () => {},
      reorderList: () => {},
      resetToDefaults: () => {},
      exportDataJson: () => {},
      importDataJson: () => ({ success: false }),
      changeAdminPassword: () => {},
      cloudStatus: 'offline',
      syncToCloud: () => {}
    };
  }
  return context;
}
