import { HttpStatusCode } from "axios";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { OrderCloudError, Tokens } from "ordercloud-javascript-sdk";
import { ApplicationRoutes } from "./constants";

export const isCurrentNavItem = (currentPathName: string, path: string) => {
  if (currentPathName === path) return true;
  return path !== "/manage" && currentPathName.indexOf(path) >= 0;
};

type RedirectType = {
  redirect: {
    permanent: boolean;
    destination: string;
  };
};

export const authorizedOperation = async <T>(
  context: GetServerSidePropsContext | GetStaticPropsContext,
  operation: Function
): Promise<T | RedirectType> => {
  let redirectDestination = "/500";
  try {
    /**
     * Get the valid authenticationi token. If not fund, redirect to the login page
     * This is the server side check of the valid authentication token.
     *
     */
    const token = await Tokens.GetValidToken();
    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: ApplicationRoutes.login,
        },
      };
    }
    return await operation();
  } catch (error) {
    const orderCloudError = error as OrderCloudError;
    console.log(orderCloudError.status);
    if (orderCloudError.status === HttpStatusCode.Unauthorized) {
      redirectDestination = ApplicationRoutes.login;
    }
  }
  return {
    redirect: {
      permanent: false,
      destination: redirectDestination,
    },
  };
};
