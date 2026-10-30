import { type CollectionEntry, getCollection } from "astro:content";

export type Post = CollectionEntry<"posts">;

export const BLOG_PATH = "/blog";
export const RSS_PATH = "/rss.xml";

const isVisible = (post: Post): boolean => import.meta.env.DEV || !post.data.draft;

const byNewest = (a: Post, b: Post): number => b.data.date.getTime() - a.data.date.getTime();

export const getVisiblePosts = async (): Promise<Post[]> => (await getCollection("posts", isVisible)).sort(byNewest);

export const postPath = (post: Post): string => `${BLOG_PATH}/${post.id}`;
