import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      _id: string;
      name?: string;
      first_name?: string;
      last_name?: string;
      email?: string;
      image?: string;
    };
  }

  interface User {
    id: string;
    _id: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    image?: string;
  }
}
