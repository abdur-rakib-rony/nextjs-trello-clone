import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/models/User";
import { connectToDB } from "./db";
import { IUser } from "@/models/User";

interface CustomUser extends NextAuthUser {
  id: string;
  _id: string;
  first_name: string;
  last_name: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    error: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account }) {
      return account?.provider === "credentials";
    },
    async jwt({ token, user, trigger, session }): Promise<JWT> {
      if (user) {
        token.id = (user as CustomUser).id;
        token._id = (user as CustomUser)._id;
        token.name = `${(user as CustomUser).first_name} ${(user as CustomUser).last_name}`;
      }
      if (trigger === "update") {
        if (session?.name) token.name = session.name;
        if (session?.email) token.email = session.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        (session.user as CustomUser).id = token.id as string;
      }
      if (token._id) {
        (session.user as CustomUser)._id = token._id as string;
      }
      if (token.name) {
        session.user.name = token.name;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        const { email } = credentials ?? {};
        if (!email) return null;

        try {
          await connectToDB();
          const user = await Users.findOne({ email });

          if (user) {
            return {
              id: user._id.toString(),
              _id: user._id.toString(),
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              name: `${user.first_name} ${user.last_name}`,
            };
          }
        } catch (error) {
          console.error("Error in authorization:", error);
        }

        return null;
      },
    }),
  ],
};
