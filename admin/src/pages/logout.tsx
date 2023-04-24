import { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import * as OrderCloud from "ordercloud-javascript-sdk";

const LogoutPage = () => {
  return <></>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  await signOut();
  OrderCloud.Tokens.RemoveAccessToken();
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
};

export default LogoutPage;
