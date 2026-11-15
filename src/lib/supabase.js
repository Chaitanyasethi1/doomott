import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uorcouscemslplhrqfhw.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_QjJLo4uTbGJpEGruHEwcGw_oWR-hKL5';

export const supabase = createClient(supabaseUrl, supabaseKey);

