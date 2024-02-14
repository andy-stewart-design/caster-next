import { PodcastIndexResponseSchema } from "@/types/podcast-index";
import Image from "next/image";
import Link from "next/link";
import * as crypto from "node:crypto";

export default async function Home() {
  const apiKey = process.env.PODCAST_INDEX_KEY;
  const apiSecret = process.env.PODCAST_INDEX_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("Missing Podcast Index credentials");
  }

  const authDate = Math.floor(Date.now() / 1000).toString();
  const authHash = crypto
    .createHash("sha1")
    .update(apiKey + apiSecret + authDate)
    .digest("hex");

  const headers = new Headers();
  headers.append("User-Agent", "Andy Podcast Client");
  headers.append("X-Auth-Key", apiKey);
  headers.append("X-Auth-Date", authDate);
  headers.append("Authorization", authHash);

  const response = await fetch(
    "https://api.podcastindex.org/api/1.0/search/byterm?q=product+design&max=10&similar=true",
    {
      headers,
    }
  );

  const data = await response.json();

  const results = PodcastIndexResponseSchema.parse(data);

  return (
    <main style={{ display: "grid", gap: "2rem" }}>
      {results.feeds.map((show) => (
        <Link key={show.id} href={`/show/${show.itunesId}`}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Image
              style={{ aspectRatio: "1/1", flexShrink: 0, background: "#AAA" }}
              src={show.image}
              alt=""
              width={100}
              height={100}
            />
            <div>
              <h2 style={{ margin: 0 }}>{show.title}</h2>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <p>{show.episodeCount} Episodes</p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  {Object.values(show.categories).map((category) => (
                    <li key={category}>{category}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}
