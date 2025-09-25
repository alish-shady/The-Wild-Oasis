import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://clrlvpvmkieiquokdvlz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscmx2cHZta2llaXF1b2tkdmx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MjA2MTEsImV4cCI6MjA3MDM5NjYxMX0.3C5GyJo1DybJt3tWxtcURzWDouXTWXQmmeLNCg5vAbg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
