// app/lib/auth.ts
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"


if (process.env.NODE_ENV !== "production") {
    console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
  }
  
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
   
}