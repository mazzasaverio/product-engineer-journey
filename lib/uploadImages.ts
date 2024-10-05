import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";
import { MediaType } from "@prisma/client";

// Inizializza UTApi
export const utapi = new UTApi();

export async function processAllPosts() {
  // Recupera tutti i postId dal database
  const posts = await prisma.post.findMany({
    select: { id: true },
  });

  // Itera su ogni postId e processa le immagini
  for (const post of posts) {
    await processPost(post.id);
  }
}

async function processPost(postId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { attachments: true },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const folderType = post.type === "city" ? "city" : "zone";
  const folderName = post.type === "city" ? post.city : post.zone;
  const folderPath = path.join("data", "photos", folderType, folderName);

  if (!fs.existsSync(folderPath)) {
    console.log(`Creazione della cartella ${folderPath}`);
    fs.mkdirSync(folderPath, { recursive: true });
  } else {
    console.log(`La cartella ${folderPath} esiste già`);
  }

  // Recupera i media esistenti per il post
  const existingMedia = await prisma.media.findMany({
    where: { postId: post.id },
  });

  // Ottieni i nomi dei file già presenti nei metadati
  const existingFileNames = existingMedia.map((media) => media.fileName);

  // Filtra i file nella cartella locale che non sono già presenti nei metadati
  const filesToUpload = fs
    .readdirSync(folderPath)
    .filter((file) => !existingFileNames.includes(file))
    .map((file) => ({
      path: path.join(folderPath, file),
      name: file,
    }));

  // Se ci sono file da caricare, procedi con il caricamento
  if (filesToUpload.length > 0) {
    const fileEsqueArray = filesToUpload.map((file) => {
      const fileBuffer = fs.readFileSync(file.path);
      return new File([fileBuffer], file.name, {
        type: getMimeType(file.name),
      });
    });

    const uploadedFiles = await utapi.uploadFiles(fileEsqueArray);

    for (const [index, uploadedFile] of uploadedFiles.entries()) {
      if (uploadedFile.data) {
        await prisma.media.create({
          data: {
            postId: post.id,
            url: uploadedFile.data.url.replace(
              "/f/",
              `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
            ),
            fileName: uploadedFile.data.name,
            type:
              uploadedFile.data.name.endsWith(".jpg") ||
              uploadedFile.data.name.endsWith(".png") ||
              uploadedFile.data.name.endsWith(".jpeg")
                ? MediaType.IMAGE
                : MediaType.VIDEO,
            order: index + 1,
            folder: folderName,
          },
        });
        console.log("Caricamento completato:", uploadedFile.data.url);
      } else {
        console.error(
          "Errore durante il caricamento del file:",
          uploadedFile.error,
        );
      }
    }
  }
}

function getMimeType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".mp4":
      return "video/mp4";
    default:
      return "application/octet-stream";
  }
}
