// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iypfbedffqxpqfpdsnif.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5cGZiZWRmZnF4cHFmcGRzbmlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MTMyMTEsImV4cCI6MjA2MDk4OTIxMX0.DUlA1eJN8yA6vYlAtirAYcF-DTgKaetKPQo4HEvQJ6I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);