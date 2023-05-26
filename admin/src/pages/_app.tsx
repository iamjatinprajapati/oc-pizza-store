import AuthenticatedLayout from "@/layouts/authenticated-layout";
import appConfiguration from "@/library/configuration";
import "@/styles/globals.css";
import { NextPageWithLayout } from "@/types/global";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Configuration } from "ordercloud-javascript-sdk";
import { ReactElement } from "react";
import NextNProgress from "nextjs-progressbar";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session;
};

const getDefaultLayout = (page: ReactElement) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);

export default function App({
  Component,
  session,
  pageProps,
}: AppPropsWithLayout) {
  Configuration.Set({
    baseApiUrl: appConfiguration.baseApiHost,
    timeoutInMilliseconds: 20 * 1000,
  });
  const getLayout = Component.getLayout ?? getDefaultLayout;
  return (
    <SessionProvider session={session}>
      {getLayout(
        <>
          <NextNProgress />
          <Component {...pageProps} />
        </>
      )}
    </SessionProvider>
  );
}
