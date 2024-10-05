import { PostData } from "@/lib/types";
import { ListFeature, Media } from "@prisma/client";
import Image from "next/image";
import BookmarkButton from "./BookmarkButton";
import LikeButton from "./LikeButton";
import { useState } from "react";
import RatingButton from "./RatingButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/nextjs";
import OMIMap from "./OMIMap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
interface LikeRatingInfo {
  likes: number;
  isLikedByUser: boolean;
  rating: number | null;
}

interface PostProps {
  post: PostData;
  listFeatures: ListFeature[];
}

export default function PostDetails({ post, listFeatures }: PostProps) {
  const { user } = useUser();

  // Definisci il centro della mappa (ad esempio Milano)
  const mapCenter = { lat: 45.4642, lng: 9.19 };

  return (
    <article className="overflow-hidden overflow-y-scroll rounded-2xl">
      <div className="relative h-72">
        <MediaPreviews attachments={post.attachments} />
        <div className="absolute left-0 top-0 inline-block w-full px-4 py-2 text-left font-bold text-white text-shadow-stroke">
          {post.country} / {post.region} / {post.city}
        </div>
      </div>

      <Tabs defaultValue="score" className="mt-0">
        <TabsList className="sticky top-0 z-10 justify-start overflow-x-auto">
          <TabsTrigger className="flex-shrink-0" value="info">
            Ulteriori Info (WIP)
          </TabsTrigger>
          <TabsTrigger
            className="flex-shrink-0"
            value="score"
            disabled
            tabIndex={-1}
          >
            Punteggio (WIP)
          </TabsTrigger>
          <TabsTrigger
            className="flex-shrink-0"
            value="parchi"
            disabled
            tabIndex={-1}
          >
            Qualità dell&apos;aria (WIP)
          </TabsTrigger>
          <TabsTrigger
            className="flex-shrink-0"
            value="coffee"
            disabled
            tabIndex={-1}
          >
            Coworking Café (WIP)
          </TabsTrigger>
          <TabsTrigger
            className="flex-shrink-0"
            value="parchi"
            disabled
            tabIndex={-1}
          >
            Sport (PLAN)
          </TabsTrigger>
          <TabsTrigger
            className="flex-shrink-0"
            value="parchi"
            disabled
            tabIndex={-1}
          >
            Lavoro (PLAN)
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="score"
          className="flex flex-col p-4 md:flex-row md:space-x-4"
        >
          <div className="order-1 w-full md:order-2 md:w-1/2">
            <OMIMap center={mapCenter} zonaOmi={post.zoneOMI} />
          </div>
          <div className="order-2 w-full md:order-1 md:w-1/2">
            {listFeatures.map((feature) => {
              const featurePostRating = post.featuresPostRatings.find(
                (f) => f.featureId === feature.id,
              );

              return (
                <div key={feature.id}>
                  <h3>{feature.label}</h3>
                  <div className="rounded-md bg-gray-800 p-2 shadow-sm">
                    <RatingButton
                      postId={post.id}
                      featureId={feature.id}
                      initialState={{
                        likes: featurePostRating?._count.likes || 0,
                        isLikedByUser: featurePostRating
                          ? featurePostRating.likes.some(
                              (like) => like.userId === user?.id,
                            )
                          : false,
                        rating:
                          featurePostRating?.likes.find(
                            (like) => like.userId === user?.id,
                          )?.rating || null,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent
          value="info"
          className="flex flex-col p-4 md:flex-row md:space-x-4"
        >
          <div className="order-1 w-full md:order-2 md:w-1/2">
            <OMIMap center={mapCenter} zonaOmi={post.zoneOMI} />
          </div>
          <div className="order-2 w-full md:order-1 md:w-1/2">
            <ReactMarkdown
              className="prose prose-invert p-2 text-white"
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
              {post.shortDescription}
            </ReactMarkdown>
          </div>
        </TabsContent>

        <TabsContent value="coffee">
          <p>Qui puoi mostrare post correlati.</p>
        </TabsContent>
        <TabsContent value="parchi">
          <p>Qui puoi mostrare post correlati.</p>
        </TabsContent>
      </Tabs>
    </article>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div>
      {attachments.map((m) => (
        <MediaPreview key={m.id} media={m} />
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  return (
    <div className="w-full">
      <Image src={media.url} alt="Attachment" fill className="object-cover" />
    </div>
  );
}
