import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth/next"

export default async function userSession() {

  const session = await getServerSession(authOptions);
  // console.log(session?.user)
  const user = session?.user;

  return user;

}