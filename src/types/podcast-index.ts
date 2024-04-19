import { z } from "zod";

export const PodcastDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  originalUrl: z.string(),
  link: z.string(),
  description: z.string(),
  author: z.string(),
  ownerName: z.string(),
  image: z.string(),
  artwork: z.string(),
  lastUpdateTime: z.number(),
  lastCrawlTime: z.number(),
  lastParseTime: z.number(),
  inPollingQueue: z.number(),
  priority: z.number(),
  lastGoodHttpStatusTime: z.number(),
  lastHttpStatus: z.number(),
  contentType: z.string(),
  itunesId: z.number().nullable(),
  generator: z.string().nullable(),
  language: z.string(),
  type: z.number(),
  dead: z.number(),
  crawlErrors: z.number(),
  parseErrors: z.number(),
  categories: z.record(z.string()),
  locked: z.number(),
  explicit: z.boolean(),
  podcastGuid: z.string(),
  medium: z.string(),
  episodeCount: z.number(),
  imageUrlHash: z.number(),
  newestItemPubdate: z.number(),
});

export const PodcastIndexResponseSchema = z.object({
  status: z.enum(["true", "false"]),
  feeds: z.array(PodcastDataSchema),
  count: z.number(),
  query: z.string(),
  description: z.string(),
});

export type PodcastData = z.infer<typeof PodcastDataSchema>;
export type PodcastIndexResponse = z.infer<typeof PodcastIndexResponseSchema>;
