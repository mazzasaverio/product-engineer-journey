// "use client";

import Image from "next/image";
import { PostNotion } from "@/types/post";
import Link from "next/link";

interface PostProps {
  post: PostNotion;
  index: number;
}

export default function Post({ post, index }: PostProps) {
  const blurUrl = "images/1500x500.jpeg";
  const description =
    "The concept of middleware in FastAPI is used to filter and process HTTP requests and responses that move through the REST API. Middleware is essentially a layer that sits between the client (making the request) and the API service (processing the request).";

  const readingTime = 5; // in minuti

  const formattedDate = formatDate(post.date);

  console.log(post.slug);
  console.log(post.title);
  console.log(post);

  return (
    <Link href={`/home/${post.slug}`}>
      <article className="overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Immagine di Copertina */}
        <div className="relative h-64">
          {/* <Image
            src={post.cover}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-2xl"
            // placeholder={blurUrl ? "blur" : "empty"}
            // blurDataURL={blurUrl}
          /> */}
        </div>

        {/* Contenuto */}
        <div className="p-6">
          {/* Titolo */}
          <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
          {/* Data e Tempo di Lettura */}
          <div className="mb-4 text-sm text-gray-600">
            <span>{formattedDate}</span> &middot;{" "}
            <span>{readingTime} min lettura</span>
          </div>
          {/* Descrizione */}
          <p className="mb-4 text-gray-800">{description}</p>
          {/* Categorie */}
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
