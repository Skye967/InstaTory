"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import { getSession, signOut } from "next-auth/react"

type User = { name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; id?: string | null | undefined; } | null

const Context = createContext<{
  user: User | null;
  id: string | null;
  email: string | null | undefined;
  name: string | null | undefined;
  picture: string | null | undefined;
  singOut: () => Promise<void>;
} | null>(null);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null | undefined>(null);
  const [name, setName] = useState<string | null | undefined>(null);
  const [picture, setPicture] = useState<string | null | undefined>('');

  const getCurrentUser = async () => {
    const session = await getSession()
    if (session && session.user) {
      const user: User = session.user;
      setUser(user);
      setId(user.id!);
      setEmail(user.email);
      setName(user.name);
      setPicture(user.image!);
      return session;
    }
    return null
  }

  useEffect(() => {
    const isUser = async () => {
      await getCurrentUser();
    }
    isUser();
  }, [])

  const singOut = async () => {
    signOut({ redirect: false }).then(() => {
      router.push("/");
    });
    clearUser();
  }

  const clearUser = () => {
    setUser(null);
    setId(null);
    setEmail(null);
    setName(null);
    setPicture(null);
  }

  const exposed = { user, id, email, name, picture, singOut };

  return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export const useUser = () => useContext(Context);

export default Provider;