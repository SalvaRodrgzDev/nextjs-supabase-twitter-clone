import { pgTable, pgEnum, uuid, text, foreignKey, unique, timestamp, primaryKey } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])


export const hashtags = pgTable("hashtags", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const likes = pgTable("likes", {
	id: uuid("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" } ),
	tweetId: uuid("tweet_id").notNull().references(() => tweets.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
},
(table) => {
	return {
		likeUnique: unique("like_unique").on(table.userId, table.tweetId),
	}
});

export const replies = pgTable("replies", {
	id: uuid("id").primaryKey().notNull(),
	text: text("text").notNull(),
	userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" } ),
	tweetId: uuid("tweet_id").references(() => tweets.id, { onDelete: "cascade" } ),
	replyId: uuid("reply_id"),
},
(table) => {
	return {
		repliesReplyIdFkey: foreignKey({
			columns: [table.replyId],
			foreignColumns: [table.id]
		}).onDelete("cascade"),
	}
});

export const bookmarks = pgTable("bookmarks", {
	id: uuid("id").primaryKey().notNull(),
	userId: uuid("user_id").references(() => profiles.id, { onDelete: "cascade" } ),
	tweetId: uuid("tweet_id").references(() => tweets.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
},
(table) => {
	return {
		bookmarkUnique: unique("bookmark_unique").on(table.userId, table.tweetId),
	}
});

export const profiles = pgTable("profiles", {
	id: uuid("id").primaryKey().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
	username: text("username").notNull(),
	fullName: text("full_name"),
},
(table) => {
	return {
		profilesUsernameKey: unique("profiles_username_key").on(table.username),
	}
});

export const tweets = pgTable("tweets", {
	id: uuid("id").primaryKey().notNull(),
	text: text("text").notNull(),
	profileId: uuid("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
});

export const tweetHashtag = pgTable("tweet_hashtag", {
	tweetId: uuid("tweet_id").notNull().references(() => tweets.id, { onDelete: "cascade" } ),
	hashtagId: uuid("hashtag_id").notNull().references(() => hashtags.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		tweetHashtagPkey: primaryKey(table.tweetId, table.hashtagId)
	}
});