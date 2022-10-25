import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { User } from "../../../Types/User";
import prisma from '../../../../lib/prisma';

export default NextAuth({
    providers: [
        GithubProvider({
          clientId: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!,
          // @ts-ignore
          scope: "read:user",
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        FacebookProvider({
          clientId: process.env.FACEBOOK_CLIENT_ID!,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
        }),
      ],
      secret: process.env.SECRET,
      
      callbacks: {
        async signIn({user, account, credentials}) {
          let userExists: User | null = await prisma.user.findUnique({
            where: { email: user.email! }
          });
          
          if(!userExists) {
            const { name, email } = user;

            await prisma.user.create({
              data: {
                name: name!,
                email: email!
              }
            });
          }

          return true;
        }
      }
})