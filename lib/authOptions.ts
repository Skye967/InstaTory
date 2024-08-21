import { AuthOptions, Profile } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope: "openid email profile",
          response_type: "code"
        }
      },
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_CLIENT_ID!,
    //   clientSecret: process.env.APPLE_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password) {
          const isValidPassword = await compare(credentials.password, user.password);
          if (isValidPassword) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ account, profile }) {
      return true // Do different verification for other providers that don't have `email_verified`
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the login page or any other page
      return baseUrl + '/auth/dashboard';
    },
    async session({ session, token }) {
      let newSession = {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
      if (token.account) {
        return newSession
      }
      return session;
    },
    async jwt({ token, user, account}) {
      if (user) {
        token.user = user
      }
      if (account) {
        token.account = account
      }
      return token
    }
  },
};

export default authOptions;
