import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import NotionPage from "@/components/notion-page";
// import RelatedPosts from "@/components/posts/related-posts";
import { getRecordMap } from "@/lib/notion";
import { getAllPostsFromNotion } from "@/services/posts";
import { PostNotion } from "@/types/post";

export const dynamic = 'force-static'

export default async function Page({ params }: { params: { slug: string } }) {
  const allPosts = await getAllPostsFromNotion();
  console.log(allPosts);

  
  console.log(params.slug);

  const post = allPosts.find((p) => p.slug === params.slug);
  console.log("######################");
  console.log(post);
  
  
  if (!post) {
    return notFound();
  }

  if (!post.published) {
    return (
      <article
        data-revalidated-at={new Date().getTime()}
        className="mx-auto mt-40 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold">Post Not Found</h2>
        <Link href="/blog">
          <span className="mr-2">&larr;</span>
          <span>Go to list page</span>
        </Link>
      </article>
    );
  }

  //   const relatedPosts: PostNotion[] = allPosts.filter(
  //     (p) =>
  //       p.slug !== slug &&
  //       p.published &&
  //       p.categories.some((v) => post.categories.includes(v)),
  //   );

  const recordMap = await getRecordMap(post.id);

  return (
    <>
      <article
        data-revalidated-at={new Date().getTime()}
        className="mt-4 flex flex-col items-center md:mt-20"
      >
        <div className="relative aspect-[3/2] w-[90vw] max-w-[900px]">
          {/* <Image
            src={post.cover}
            alt="cover"
            fill
            style={{ objectFit: "contain" }}
            // placeholder="blur"
            // blurDataURL={post.blurUrl}
          /> */}
        </div>
        <NotionPage post={post} recordMap={recordMap} />
      </article>
      {/* <RelatedPosts posts={relatedPosts} /> */}
    </>
  );
}

export async function generateStaticParams() {
  const allPosts = await getAllPostsFromNotion();

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const allPosts = await getAllPostsFromNotion();
  const post = allPosts.find((p) => p.slug === slug);

  return post
    ? {
        title: post.title,
        // openGraph: {
        //   images: [
        //     {
        //       url: post.cover,
        //       width: 400,
        //       height: 300,
        //     },
        //   ],
        // },
      }
    : {};
}
