import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase.types";

const supabaseURl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export const getTweets = async () => {
    if (supabaseURl && supabaseSecretKey) {
      const supabaseServer = new SupabaseClient(supabaseURl, supabaseSecretKey);
  
      return await supabaseServer
        .from("tweets")
        .select(
          `
          *,
          profiles (
            full_name,
            username
          )
          `
        )
        .returns<
        (Database["public"]["Tables"]["tweets"]["Row"] & {
          profiles: Pick<
            Database["public"]["Tables"]["profiles"]["Row"], "full_name" | "username"
            >;
        })[]
      >();
    }
  }