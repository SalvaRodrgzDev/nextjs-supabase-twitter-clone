"use server";


import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase.types";
import { randomUUID } from "crypto";

const supabaseURl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export type Tweet = Database["public"]["Tables"]["tweets"]["Row"] & {
    profiles: Pick<
        Database["public"]["Tables"]["profiles"]["Row"], "full_name" | "username"
    >;
}

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
        .returns<Tweet[]>();
    }
  }

export const likeTweet = async ({tweetId, userId}: {tweetId: string, userId: string}) => {
  if (supabaseURl && supabaseSecretKey) {
    const supabaseServer = new SupabaseClient(supabaseURl, supabaseSecretKey);

    await supabaseServer.from("likes").insert({
      id: randomUUID(),
      tweet_id:tweetId,
      user_id: userId
    })
  }
}