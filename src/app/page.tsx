import SearchForm from "@/components/SearchForm/SearchForm";
import { ItunesResultSchema } from "@/types/itunes-api";
import { PodcastIndexResponseSchema } from "@/types/podcast-index";
import Image from "next/image";
import Link from "next/link";
import * as crypto from "node:crypto";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: PageProps) {
  const query =
    typeof searchParams.query === "string" ? searchParams.query : undefined;

  const results = await getShows(query);

  return (
    <main style={{ display: "grid", gap: "2rem" }}>
      <SearchForm defaultValue={query} />
      {results &&
        results.results.map((show) => (
          <Link key={show.collectionId} href={`/show/${show.collectionId}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                style={{
                  aspectRatio: "1/1",
                  flexShrink: 0,
                  background: "#AAA",
                }}
                src={show.artworkUrl600!}
                alt=""
                width={100}
                height={100}
              />
              <div>
                <h2 style={{ margin: 0 }}>{show.collectionName}</h2>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <p>{show.trackCount} Episodes</p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    {Object.values(show.genres).map((genre) => (
                      <li key={genre}>{genre}</li>
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

async function getShows(query: string | undefined) {
  if (!query) return undefined;

  // const apiKey = process.env.PODCAST_INDEX_KEY;
  // const apiSecret = process.env.PODCAST_INDEX_SECRET;

  // if (!apiKey || !apiSecret) {
  //   throw new Error("Missing Podcast Index credentials");
  // }

  // const authDate = Math.floor(Date.now() / 1000).toString();
  // const authHash = crypto
  //   .createHash("sha1")
  //   .update(apiKey + apiSecret + authDate)
  //   .digest("hex");

  // const headers = new Headers();
  // headers.append("User-Agent", "Andy Podcast Client");
  // headers.append("X-Auth-Key", apiKey);
  // headers.append("X-Auth-Date", authDate);
  // headers.append("Authorization", authHash);

  // const response = await fetch(
  //   `https://api.podcastindex.org/api/1.0/search/byterm?q=${query}&max=10&similar=true`,
  //   {
  //     headers,
  //   }
  // );

  // const data = await response.json();

  // return PodcastIndexResponseSchema.parse(data);
  const response = await fetch(
    `https://itunes.apple.com/search?term=${query}&media=podcast&limit=25`
  );
  const data = await response.json();
  return ItunesResultSchema.parse(data);
}
