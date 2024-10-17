import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Posts from "@/components/Posts";

export default function Home() {
  return (
    <div className="space-y-6">
      
      <Tabs defaultValue="posts">
        <TabsList className="w-full">
          <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
          <TabsTrigger value="news" className="flex-1">Dev News</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <Posts type="zone" />
        </TabsContent>
        <TabsContent value="news">
          <Posts type="city" />
        </TabsContent>
      </Tabs>
    </div>
  );
}