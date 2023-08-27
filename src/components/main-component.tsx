import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Tweet from "./client-components/tweet";
import ComposeTweet from "./server-components/compose-tweet";
import { getTweets } from "@/lib/supabase/queries";
import { cookies, headers } from "next/headers";

const MainComponent = async () => {
  const supabaseClient = createServerComponentSupabaseClient({
    cookies,
    headers
  })
  
  const { data: userData, error: userError } =
  await supabaseClient.auth.getUser();
  
  const res = await getTweets(userData.user?.id);
  return (
    <main className="flex w-full h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
        Home
      </h1>
      <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-6 space-x-2 border-gray-600 relative">
        <ComposeTweet/>
      </div>
      <div className="w-full">
        { res?.data && res.data.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </main>
  );
};

export default MainComponent;