import { DefaultSession } from "next-auth";
import NextAuth, { DefaultSession, DefaultUser, User } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import OrderCloud from "ordercloud-javascript-sdk";

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string | "";
      refresh_token: string | null;
      token_type: string | "";
      expires_in: number;
      me: OrderCloud.MeUser;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser extends User {
    access_token: string | "";
    refresh_token: string | null;
    token_type: string | "";
    expires_in: number;
    me: OrderCloud.MeUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Record<string, unknown>, DefaultJWT {
    access_token: string | "";
    refresh_token: string | null;
    token_type: string | "";
    expires_in: number;
    me: OrderCloud.MeUser;
  }
}
