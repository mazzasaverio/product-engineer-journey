import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "./_components/Navbar";
import Posts from "@/components/Posts";
import BackgroundVideo from "@/components/BackgoundVideos";

export default function Home() {
  return (
    <main className="relative mx-auto flex w-full grow gap-5">
      <div className="w-full min-w-0">
        <Navbar />

        <div className="mt-5 w-full min-w-0 space-y-5 p-5">
          <Tabs defaultValue="areas">
            <TabsList>
              <TabsTrigger value="areas">Posts</TabsTrigger>
              <TabsTrigger value="cities">Dev News</TabsTrigger>
            </TabsList>

            <TabsContent value="areas">
              <Posts type="zone" />
            </TabsContent>
            <TabsContent value="cities">
              <Posts type="city" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
