import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export default async function About() {
  const url = cookies().get("url")?.value ?? "1";

  const data = await getProduct(url);

  return (
    <main>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </main>
  );
}

async function getProduct(url: string | undefined) {
  if (!url) return { message: "product not found" };
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
