import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push('/'); // Redirect to login if not authenticated
    return null;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.email}</h1>
      <p>This is your dashboard.</p>
    </div>
  );
}
