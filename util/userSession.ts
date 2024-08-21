import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth/next"

export default async function userSession() {

  const session = await getServerSession(authOptions);
  const user = session?.user;

  return user;

}