"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { z } from "zod";

type ComponentProps = {
  defaultValue?: string;
};

export default function SearchForm({ defaultValue }: ComponentProps) {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const schema = z.object({
      query: z.string(),
    });

    const formData = new FormData(event.currentTarget);
    const data = schema.parse({ query: formData.get("query") });

    const searchParams = new URLSearchParams();
    if (data.query !== "") searchParams.set("query", data.query);
    else searchParams.delete("query");

    router.push(`/?${searchParams}`, { scroll: false });
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="query" defaultValue={defaultValue ?? ""} />
      <button type="submit">Search</button>
    </form>
  );
}
