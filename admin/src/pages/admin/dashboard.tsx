import useSetPageHeading from "@/hooks/use-set-page-heading";
import { NextPageWithLayout } from "@/types/global";
import { GetServerSidePropsContext } from "next";
import { Me, MeUser } from "ordercloud-javascript-sdk";

const IndexPage: NextPageWithLayout = () => {
  useSetPageHeading("Dashboard");
  return <></>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {},
  };
};

export default IndexPage;
