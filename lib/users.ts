import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function createUser(user: User) {
  try {
    await prisma.user.create({
      data: user,
    });
  } catch (err) {
    console.error("Error creating user:", err);
  }
}

export async function updateUser(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: { id: id },
      data,
    });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id: id },
    });
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
