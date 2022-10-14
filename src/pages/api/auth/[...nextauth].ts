import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { api } from "../../../services/api";
import { User } from "../../../Types/User";
import { signOut } from "next-auth/react";

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
          let userIfinance: User = null;

          await api.get(`users-ifinances?filters[email][$eq]=${user.email}`)
            .then(response => {
              if(response.data.data.length !== 0) {
                return true;
              }
            })
            .catch(err => {
              console.log(err)
            })
          
          if(!userIfinance) {
            await api.post('users-ifinances', {
              data: {
                name: user.name,
                email: user.email
              }
            })
            .then(response => {
              return true;
            })
            .catch(err => {
              signOut();
              return false;
            })
          }

          return true;
        }
      }
})