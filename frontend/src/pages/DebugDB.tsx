import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const DebugDB = () => {
    const [status, setStatus] = useState<string>("Idle");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [config, setConfig] = useState<any>(null);

    useEffect(() => {
        // Check config on load
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        setConfig({
            urlProvided: !!url,
            urlLength: url?.length,
            keyProvided: !!key,
            keyLength: key?.length
        });
    }, []);

    const checkConnection = async () => {
        setStatus("Checking connection...");
        setError(null);
        try {
            // Try to select count from members
            const { count, error: countError } = await supabase
                .from("members")
                .select("*", { count: "exact", head: true });

            if (countError) {
                throw countError;
            }

            setStatus(`Success! Connection working. Found ${count} members.`);
        } catch (err: unknown) {
            console.error("DB Check Error:", err);
            setStatus("Error connecting to DB");
            setError(err);
        }
    };

    const createTableSnippet = `
-- Run this in Supabase SQL Editor:

create table if not exists members (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  nombre text not null,
  apellido text not null,
  telefono text not null,
  bloqueado boolean default false,
  fecha_registro timestamp with time zone default timezone('utc'::text, now())
);

alter table members enable row level security;

create policy "Allow public registration"
  on members
  for insert
  with check (true);

create policy "Allow public read of basic status"
  on members
  for select
  using (true);
  `;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 p-8 pt-24 font-mono">
            <Navbar />
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold dark:text-white">Database Debugger</h1>

                <div className="p-4 border rounded bg-slate-50 dark:bg-slate-800 dark:text-slate-200">
                    <h2 className="font-bold mb-2">Environment Config</h2>
                    <pre className="text-xs">{JSON.stringify(config, null, 2)}</pre>
                </div>

                <Button onClick={checkConnection} className="w-full">
                    Test Connection to 'members' table
                </Button>

                {status && (
                    <div className={`p-4 border rounded ${error ? "bg-red-50 border-red-200 text-red-900" : "bg-green-50 border-green-200 text-green-900"}`}>
                        <p className="font-bold">{status}</p>
                        {error && (
                            <pre className="mt-2 text-xs overflow-auto max-h-40">
                                {JSON.stringify(error, null, 2)}
                            </pre>
                        )}
                    </div>
                )}

                {error && error.code === "PGRST204" && (
                    <div className="p-4 border border-yellow-200 bg-yellow-50 text-yellow-900 rounded">
                        <h3 className="font-bold">Table not found!</h3>
                        <p className="mb-2">It looks like the `members` table doesn't exist. Please run this SQL in your Supabase Dashboard:</p>
                        <pre className="text-xs bg-white p-2 border rounded overflow-auto">
                            {createTableSnippet}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DebugDB;
