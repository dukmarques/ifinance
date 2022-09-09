import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
          // @ts-ignore
            scope: "read:user",
        }),
        // ...add more providers here
      ],
})