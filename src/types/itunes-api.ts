import { z } from "zod";

export const ItunesPodcastSchema = z.object({
  artistName: z.string(),
  artworkUrl30: z.string().optional().nullable(),
  artworkUrl60: z.string().optional().nullable(),
  artworkUrl100: z.string().optional().nullable(),
  artworkUrl600: z.string().optional().nullable(),
  collectionCensoredName: z.string(),
  collectionExplicitness: z.string(),
  collectionId: z.number(),
  collectionHdPrice: z.number(),
  collectionName: z.string(),
  collectionPrice: z.number(),
  collectionViewUrl: z.string(),
  contentAdvisoryRating: z.string().optional(),
  country: z.string(),
  currency: z.string(),
  feedUrl: z.string().optional(),
  genreIds: z.array(z.string()),
  genres: z.array(z.string()),
  kind: z.string(),
  primaryGenreName: z.string(),
  releaseDate: z.string(),
  trackCensoredName: z.string(),
  trackExplicitness: z.enum(["explicit", "cleaned", "notExplicit"]),
  trackCount: z.number(),
  trackId: z.number(),
  trackName: z.string(),
  trackPrice: z.number(),
  trackTimeMillis: z.number().optional(),
  trackViewUrl: z.string(),
  wrapperType: z.enum(["track", "collection", "artist"]),
});

export const ItunesResultSchema = z.object({
  resultCount: z.number(),
  results: z.array(ItunesPodcastSchema),
});
