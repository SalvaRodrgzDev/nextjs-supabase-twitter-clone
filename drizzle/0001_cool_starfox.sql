DROP TABLE "tweets_replies";--> statement-breakpoint
ALTER TABLE "tweets" DROP CONSTRAINT "tweets_reply_id_tweets_id_fk";
--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "avatar_url";--> statement-breakpoint
ALTER TABLE "tweets" DROP COLUMN IF EXISTS "is_reply";--> statement-breakpoint
ALTER TABLE "tweets" DROP COLUMN IF EXISTS "reply_id";