import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tutaydcbsuglspuywosf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1dGF5ZGNic3VnbHNwdXl3b3NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1NTI2NzcsImV4cCI6MjAyMDEyODY3N30.sxTRxJjcyU_0u8lwqqNxAGbDMGh914y8M7eUmUrhVfQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
