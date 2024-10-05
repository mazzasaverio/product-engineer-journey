import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Posts from "@/components/Posts";

import Navbar from "../_components/Navbar";

export default async function Home() {
  console.log("Home");
  return (
    <>
      {/* <Navbar /> */}
      <main className="mx-auto flex w-full grow gap-5 p-5">
        <div className="w-full min-w-0">
          <div className="mt-5 w-full min-w-0 space-y-5">
            <Tabs defaultValue="cities">
              <TabsList>
                <TabsTrigger value="cities">Posts</TabsTrigger>
                {/* <TabsTrigger value="areas">News</TabsTrigger> */}
              </TabsList>
              <TabsContent value="cities">
                <Posts type="city" />
              </TabsContent>
              {/* <TabsContent value="areas">
                <News type="zone" />
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
}
