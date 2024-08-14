import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; // Adjust import path as necessary
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user && credentials?.password) {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            return user;
          }
        }
        return null;
      },
    }),
    // Add other providers if needed
  ],
  pages: {
    signIn: '/', // Redirect to the home page for login
  },
};
