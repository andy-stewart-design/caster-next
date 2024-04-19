import * as crypto from "node:crypto";
import PlayButton from "@/components/PlayButton";

export default async function Page({ params }: { params: { id: string } }) {
  const apiKey = process.env.PODCAST_INDEX_KEY;
  const apiSecret = process.env.PODCAST_INDEX_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("Missing Podcast Index credentials");
  }

  console.log(params);

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

  async function getShow() {
    const response = await fetch(
      `https://api.podcastindex.org/api/1.0/podcasts/byitunesid?id=${params.id}`,
      { headers }
    );
    const data = await response.json();
    // console.log("searching for shows", params.id);

    return data.feed;
  }

  async function getEpisodes() {
    const response = await fetch(
      `https://api.podcastindex.org/api/1.0/episodes/byitunesid?id=${params.id}&fulltext`,
      { headers }
    );
    const data = await response.json();

    return data.items;
  }

  const [showData, episodeData] = await Promise.all([getShow(), getEpisodes()]);

  return (
    <main>
      <header>
        <h1>{showData.title}</h1>
        <p>{showData.description}</p>
        {/* <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            gap: "0.5rem",
          }}
        >
          {Object.values<string>(showData.categories).map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul> */}
      </header>
      <section style={{ display: "grid", gap: "3rem" }}>
        {episodeData.map((episode: any) => (
          <article key={episode.id}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <PlayButton src={episode.enclosureUrl} />
              <h2>{episode.title}</h2>
            </div>
            <p>{episode.datePublishedPretty}</p>
            <div
              dangerouslySetInnerHTML={{ __html: episode.description }}
            ></div>
          </article>
        ))}
      </section>
    </main>
  );
}
