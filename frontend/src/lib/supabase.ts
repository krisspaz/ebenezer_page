
import { createClient } from '@supabase/supabase-js';

// Get environment variables
// IMPORTANT: You need to create a .env file in the frontend root with these values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL or Key not found. App will load but data fetching will fail.');
  console.log('Debug Info:', {
    url: supabaseUrl,
    keyLength: supabaseKey?.length || 0,
    envMode: import.meta.env.MODE
  });
} else {
  console.log('Supabase Client Initialized', {
    url: supabaseUrl,
    keyLength: supabaseKey.length
  });
}

// Fallback to avoid crash if env variables are missing
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder'
);
