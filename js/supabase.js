const SUPABASE_URL = 'https://gyfopchqazjpwjeuyuav.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Zm9wY2hxYXpqcHdqZXV5dWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMTU4NTIsImV4cCI6MjEwMTY5MTg1Mn0.OVgviznwQzTCw9WKSoI49Ck-KkVMNLiLagFOWfOPWlo'

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON);
