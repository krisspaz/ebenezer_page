
import { createClient } from '@supabase/supabase-js';

// Get environment variables
// IMPORTANT: You need to create a .env file in the frontend root with these values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL or Key not found in environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
