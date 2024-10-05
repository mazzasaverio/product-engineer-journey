import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
//
import { createUser, deleteUser, updateUser } from "@/lib/users";
import { User } from "@prisma/client";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  console.log("Webhook payload:", body);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, image_url } = evt.data;
    if (!id || !email_addresses) {
      return new Response("Error occured -- no user data", {
        status: 400,
      });
    }
    const user = {
      id: id,
      email: email_addresses[0].email_address,
      ...(image_url ? { imageUrl: image_url } : {}),
    };

    await createUser(user as User);
  } else if (eventType === "user.updated") {
    const { id, email_addresses, image_url } = evt.data;
    if (!id || !email_addresses) {
      return new Response("Error occured -- no user data", {
        status: 400,
      });
    }
    const user = {
      email: email_addresses[0].email_address,

      ...(image_url ? { imageUrl: image_url } : {}),
    };

    await updateUser(id, user as Partial<User>);
  } else if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (!id) {
      return new Response("Error occured -- no user id", {
        status: 400,
      });
    }

    await deleteUser(id);
  }

  return new Response("", { status: 200 });
}
