
import { createClient } from '@supabase/supabase-js';

// Get environment variables
// IMPORTANT: You need to create a .env file in the frontend root with these values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL or Key not found. App will load but data fetching will fail.');
}

// Fallback to avoid crash if env variables are missing
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder'
);
