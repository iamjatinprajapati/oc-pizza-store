import { BasePageProps } from "@/types/global";
import Head from "next/head";

const GuestLayout = ({ children }: BasePageProps) => {
  return (
    <>
      <Head>
        <title>Pizza store admin - OrderCloud - POC</title>
      </Head>
      {children}
    </>
  );
};

export default GuestLayout;
