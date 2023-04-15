import useSetPageHeading from "@/hooks/use-set-page-heading";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function Home() {
  useSetPageHeading("Welcome");
  return <></>;
}
