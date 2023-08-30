CREATE TABLE IF NOT EXISTS "tweets_replies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text NOT NULL,
	"profile_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_reply" boolean DEFAULT false NOT NULL,
	"reply_id" uuid
);
--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "is_reply" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "reply_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tweets" ADD CONSTRAINT "tweets_reply_id_tweets_id_fk" FOREIGN KEY ("reply_id") REFERENCES "tweets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tweets_replies" ADD CONSTRAINT "tweets_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tweets_replies" ADD CONSTRAINT "tweets_reply_id_tweets_id_fk" FOREIGN KEY ("reply_id") REFERENCES "tweets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
