import useSetPageHeading from "@/hooks/use-set-page-heading";
import { NextPageWithLayout } from "@/types/global";

const IndexPage: NextPageWithLayout = () => {
  useSetPageHeading("Buyers");
  return <></>;
};

export default IndexPage;
