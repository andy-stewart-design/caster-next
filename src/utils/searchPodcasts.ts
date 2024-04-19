"use server";

import { useRouter } from "next/navigation";
import { z } from "zod";

export async function searchPodcasts(prevState: any, formData: FormData) {
  const schema = z.object({
    query: z.string().min(1),
  });

  const { query } = schema.parse({ query: formData.get("query") });
  const searchParams = new URLSearchParams();

  if (query !== "") searchParams.set("query", query);
  else searchParams.delete("query");

  console.log(`/?${searchParams}`);
  //   router.push(`/?${searchParams}`, { scroll: false });

  return {
    message: "Please enter a valid email",
  };
}
