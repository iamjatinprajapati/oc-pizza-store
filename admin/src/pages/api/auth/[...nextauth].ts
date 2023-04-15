import appConfiguration from "@/library/configuration";
import { NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import {
  AccessToken,
  Auth,
  Me,
  MeUser,
  Tokens,
} from "ordercloud-javascript-sdk";

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, request) {
        try {
          if (credentials) {
            const tokenResponse: AccessToken = await Auth.Login(
              credentials?.username,
              credentials?.password,
              appConfiguration.sellerAppAPIClientId,
              appConfiguration.sellerAdminScopes
            );
            if (tokenResponse && tokenResponse.access_token) {
              Tokens.SetAccessToken(tokenResponse.access_token);
              const meResponse = await Me.Get<MeUser>();
              if (meResponse) {
                const user: AdapterUser = {
                  me: meResponse,
                  name: `${meResponse.FirstName} ${meResponse.LastName}`,
                  email: meResponse.Email,
                  token_type: tokenResponse.token_type ?? "bearer",
                  access_token: tokenResponse.access_token ?? "",
                  refresh_token: tokenResponse.refresh_token ?? "",
                  expires_in: tokenResponse.expires_in ?? 36000,
                  id: meResponse.ID,
                  emailVerified: new Date(),
                };
                return user;
              }
            }
          }
          return null;
        } catch (error) {
          console.log("ERROR");
          console.log(error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (token && user) {
        const adapterUser = user as AdapterUser;
        return {
          ...token,
          access_token: adapterUser.access_token,
          refresh_token: adapterUser.refresh_token,
          token_type: adapterUser.token_type,
          expires_in: adapterUser.expires_in,
          me: adapterUser.me,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session && token) {
        session.user.access_token = token.access_token;
        session.user.refresh_token = token.refresh_token;
        session.user.expires_in = token.expires_in;
        session.user.token_type = token.token_type;
        session.user.me = token.me;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
