import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      id: string;
      name?: string;
      first_name?: string;
      last_name?: string;
      email?: string;
      image?: string;
    };
  }

  interface User {
    _id: string;
    id: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    image?: string;
  }
}
