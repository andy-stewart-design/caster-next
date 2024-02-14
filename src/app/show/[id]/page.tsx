import Parser from "rss-parser";
import * as crypto from "node:crypto";
import { ItunesResultSchema } from "@/types/itunes-api";

export default async function Page({ params }: { params: { id: string } }) {
  //   const authDate = Math.floor(Date.now() / 1000).toString();
  //   const authHash = crypto
  //     .createHash("sha1")
  //     .update(apiKey + apiSecret + authDate)
  //     .digest("hex");

  //   const headers = new Headers();
  //   headers.append("User-Agent", "Andy Podcast Client");
  //   headers.append("X-Auth-Key", apiKey);
  //   headers.append("X-Auth-Date", authDate);
  //   headers.append("Authorization", authHash);

  //   const response = await fetch(
  //       `https://api.podcastindex.org/api/1.0/episodes/byitunesid?id=${params.id}&pretty`,
  //       { headers }
  //       );
  //       const data = await response.json();

  const { feed, audioLink } = await getFeed(params.id);

  return (
    <main>
      {audioLink && <audio controls src={audioLink}></audio>}
      <pre>
        <code>{JSON.stringify(feed, null, 2)}</code>
      </pre>
    </main>
  );
}

async function getFeed(id: string) {
  const iTunesResponse = await fetch(
    `https://itunes.apple.com/lookup?id=${id}`
  );
  const iTunesData = await iTunesResponse.json();
  const [iTunesResult] = ItunesResultSchema.parse(iTunesData).results;

  const parser = new Parser();
  const feed = await parser.parseURL(iTunesResult.feedUrl);
  const audioLink = feed.items.at(0)?.enclosure?.url;

  return { feed, audioLink };
}
