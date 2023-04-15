import { GetServerSidePropsContext } from "next";
import * as OrderCloud from "ordercloud-javascript-sdk";

const LogoutPage = () => {
  return <></>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  OrderCloud.Tokens.RemoveAccessToken();
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
};

export default LogoutPage;
