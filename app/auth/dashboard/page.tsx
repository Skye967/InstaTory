"use client";
// import authOptions from "@/lib/authOptions";
// import { getServerSession } from "next-auth/next"
import userSession from "@/util/userSession";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  // const user = await userSession();
  // console.log("User", user)

  useEffect(() => {
    
    const fetchData = async () => {
      const res = await fetch('/api/auth/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.json();
    };

    if (!user) {
      fetchData().then(session => {
        setUser(session);
      });
    }

    console.log("User", user);

  }, [user]);

  return (
    <div>
      <h1>Protected Content</h1>
    </div>
  );
}
