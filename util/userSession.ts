import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";

export default async function userSession() {
  // const session = await getServerSession(authOptions);

  // const user : { name?: string | null, email?: string | null, image?: string | null, id?: string | null } | undefined = session?.user;

  // return user!;

  const res = await fetch("/api/auth/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user:
    | {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        id?: string | null;
      }
    | any = res.json();

    if(!res.ok) {
      throw new Error(user.error);
    }

  return user;
}
