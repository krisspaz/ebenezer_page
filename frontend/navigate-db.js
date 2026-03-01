import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual .env parsing since we don't have dotenv installed and want to avoid adding deps
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
        console.error("Could not read .env file. Make sure you are in the frontend directory.");
        return null;
    }
}

async function checkDatabase() {
    console.log("🔍 Starting Database Check...");

    const env = loadEnv();
    if (!env) return;

    const url = env.VITE_SUPABASE_URL;
    const key = env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) {
        console.error("❌ Missing Supabase Environment Variables!");
        console.log("VITE_SUPABASE_URL:", url ? "Present" : "Missing");
        console.log("VITE_SUPABASE_ANON_KEY:", key ? "Present" : "Missing");
        return;
    }

    console.log("✅ Credentials found. Connecting...");

    const supabase = createClient(url, key);

    try {
        const { data, error } = await supabase
            .from('members')
            .select('*');

        if (error) {
            console.error("❌ Error fetching members:", error);
        } else {
            console.log(`✅ Found ${data.length} records:`);
            console.table(data);

            // Helpful output for the next step
            if (data.length >= 2) {
                console.log("\nTo delete the last 2 records, you can use these IDs:");
                console.log(data.slice(-2).map(m => m.id));
            }
        }

    } catch (err) {
        console.error("❌ Unexpected Error:", err);
    }
}

checkDatabase();
