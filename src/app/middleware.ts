import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }:any) => !!token,
  },
});

export const config = {
  matcher: [
    "/dashboard",
  ],
};