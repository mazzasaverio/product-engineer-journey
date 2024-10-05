import { getRecordMap, mapImageUrl } from "@/lib/notion";
import { PostNotion } from "@/types/post";

export async function getAllPostsFromNotion() {
  const allPosts: PostNotion[] = [];

  // Verifica che l'ID del database Notion sia definito
  if (!process.env.NOTION_DATABASE_ID) {
    throw new Error(
      "NOTION_DATABASE_ID non è definito nelle variabili d'ambiente.",
    );
  }

  const recordMap = await getRecordMap(process.env.NOTION_DATABASE_ID);
  const { block, collection } = recordMap;

  // Verifica che collection e block siano definiti
  if (!collection || Object.keys(collection).length === 0) {
    throw new Error("La collection ottenuta da Notion è vuota o non definita.");
  }

  if (!block || Object.keys(block).length === 0) {
    throw new Error("Il blocco ottenuto da Notion è vuoto o non definito.");
  }

  const collectionValues = Object.values(collection);
  const schema = collectionValues[0]?.value?.schema as Record<string, any>;

  if (!schema) {
    throw new Error("Lo schema della collection è indefinito.");
  }

  const propertyMap: Record<string, string> = {};

  Object.keys(schema).forEach((key) => {
    const name = schema[key].name;
    if (name) {
      propertyMap[name] = key;
    }
  });

  Object.keys(block).forEach((pageId) => {
    const pageBlock = block[pageId].value;
    const properties = pageBlock.properties as Record<string, any>;

    if (pageBlock.type === "page" && properties?.[propertyMap["Slug"]]) {
      const { last_edited_time } = pageBlock;

      const contents = pageBlock.content || [];
      const dates = contents
        .map((contentId) => block[contentId]?.value?.last_edited_time)
        .filter((time) => time !== undefined) as number[];
      dates.push(last_edited_time);
      dates.sort((a, b) => b - a);
      const lastEditedAt = dates[0];

      const id = pageId;
      const slug = properties[propertyMap["Slug"]]?.[0]?.[0] || "";
      const title = properties[propertyMap["Page"]]?.[0]?.[0] || "";
      const categoriesString =
        properties[propertyMap["Category"]]?.[0]?.[0] || "";
      const categories = categoriesString.split(",").map((cat) => cat.trim());

      // Gestione della cover
      let cover = "";
      const coverProperty = properties[propertyMap["Cover"]];
      if (coverProperty && coverProperty[0][1]) {
        cover = coverProperty[0][1][0][1];
        cover = mapImageUrl(cover, pageBlock) || "";
      }

      // Gestione della data
      let date = "";
      const dateProperty = properties[propertyMap["Date"]];
      if (dateProperty && dateProperty[0][1][0][1]["start_date"]) {
        date = dateProperty[0][1][0][1]["start_date"];
      }

      const published =
        properties[propertyMap["Published"]]?.[0]?.[0] === "Yes";

      allPosts.push({
        id,
        title,
        slug,
        categories,
        cover,
        date,
        published,
        lastEditedAt,
      });
    }
  });

  return allPosts;
}
