import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const envVars = {};
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                envVars[key.trim()] = value.trim();
            }
        });
        return envVars;
    } catch (e) {
        return null;
    }
}

async function deleteRecords() {
    console.log("🗑️  Starting Deletion...");

    const env = loadEnv();
    if (!env) return;

    const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

    // IDs identified from previous step
    const idsToDelete = [
        '8a12e12f-5fd9-496b-91a1-2b6c72d0be72', // Obi Wan
        '6a57cdba-aaae-4838-9129-3d621c311ba6'  // Test User
    ];

    console.log(`Targeting ${idsToDelete.length} records for deletion...`);

    const { error } = await supabase
        .from('members')
        .delete()
        .in('id', idsToDelete);

    if (error) {
        console.error("❌ Error deleting records:", error);
    } else {
        console.log("✅ Successfully deleted records.");

        // Verify
        const { count } = await supabase.from('members').select('*', { count: 'exact', head: true });
        console.log(`Current record count: ${count}`);
    }
}

deleteRecords();
