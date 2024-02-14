import { z } from "zod";

export const ItunesResultSchema = z.object({
  resultCount: z.number(),
  results: z.array(
    z.object({
      wrapperType: z.string(),
      kind: z.string(),
      collectionId: z.number(),
      trackId: z.number(),
      artistName: z.string(),
      collectionName: z.string(),
      trackName: z.string(),
      collectionCensoredName: z.string(),
      trackCensoredName: z.string(),
      collectionViewUrl: z.string(),
      feedUrl: z.string(),
      trackViewUrl: z.string(),
      artworkUrl30: z.string(),
      artworkUrl60: z.string(),
      artworkUrl100: z.string(),
      collectionPrice: z.number(),
      trackPrice: z.number(),
      collectionHdPrice: z.number(),
      releaseDate: z.string(),
      collectionExplicitness: z.string(),
      trackExplicitness: z.string(),
      trackCount: z.number(),
      trackTimeMillis: z.number(),
      country: z.string(),
      currency: z.string(),
      primaryGenreName: z.string(),
      contentAdvisoryRating: z.string(),
      artworkUrl600: z.string(),
      genreIds: z.array(z.string()),
      genres: z.array(z.string()),
    })
  ),
});
