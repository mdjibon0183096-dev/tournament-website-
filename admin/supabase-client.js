import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "./config.js";

if (SUPABASE_URL.includes("YOUR_PROJECT_REF") || SUPABASE_PUBLISHABLE_KEY.includes("YOUR_")) {
  console.warn("Configure js/config.js with your Supabase project URL and publishable key.");
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
