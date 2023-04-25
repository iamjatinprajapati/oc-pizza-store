import { ApplicationRoutes } from "@/library/constants";
import { NextPageWithLayout } from "@/types/global";
import { XCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { Buyer, Buyers } from "ordercloud-javascript-sdk";

type PageProps = {
  buyer: Buyer;
};
const IndexPage: NextPageWithLayout<PageProps> = ({ buyer }) => {
  const router = useRouter();
  const deleteBuyer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    await Buyers.Delete(buyer.ID as string);
    router.push(ApplicationRoutes.buyers);
  };
  return (
    <div
      className={clsx(
        "px-4 sm:px-8 py-4",
        buyer.Active ? "bg-green-200" : "bg-red-700 text-white"
      )}
    >
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2
            className={clsx(
              "text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight",
              buyer.Active ? "text-gray-900" : "text-white"
            )}
          >
            {buyer.Name}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div
              className={clsx(
                "mt-2 flex items-center text-sm text-gray-500",
                buyer.Active ? "text-gray-500" : "text-white"
              )}
            >
              <span className="font-semibold">ID:</span>&nbsp;
              {buyer.ID}
            </div>
            <div
              className={clsx(
                "mt-2 flex items-center text-sm text-gray-500",
                buyer.Active ? "text-gray-500" : "text-white"
              )}
            >
              <span className="font-semibold">Default catalog:</span>&nbsp;
              {buyer.DefaultCatalogID}
            </div>
            <div
              className={clsx(
                "mt-2 flex items-center text-sm text-gray-500",
                buyer.Active ? "text-gray-500" : "text-white"
              )}
            >
              <span className="font-semibold">Created:</span>&nbsp;
              {buyer.DateCreated}
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="hidden sm:block">
            <button
              onClick={deleteBuyer}
              type="button"
              className={clsx(
                "inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold  shadow-sm ",
                buyer.Active
                  ? "bg-red-700 hover:bg-red-800 text-white"
                  : "bg-red-900 hover:bg-red-950 text-white"
              )}
            >
              <XCircleIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-red-400"
                aria-hidden="true"
              />
              Delete
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;
  const buyer = await Buyers.Get(id as string);
  // console.log(buyer);
  return {
    props: {
      buyer: buyer,
    },
  };
};
