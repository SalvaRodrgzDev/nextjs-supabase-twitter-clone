import { SupabaseClient } from "@supabase/supabase-js";

const supabaseURl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY ?? '';

export const supabaseServer = new SupabaseClient(supabaseURl, supabaseSecretKey);