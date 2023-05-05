import { ApplicationRoutes } from "@/library/constants";
import { authorizedOperation } from "@/library/helper";
import { NextPageWithLayout } from "@/types/global";
import { XCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import {
  Buyer,
  Buyers,
  Catalog,
  Catalogs,
  Product,
  Products,
} from "ordercloud-javascript-sdk";
import { Tab } from "@headlessui/react";
import CategoriesList from "@/components/catalogs/categories/categories-list";
const tabs = [
  { name: "Categories", href: "#", current: false },
  { name: "Product", href: "#", current: true },
];
type PageProps = {
  catalog: Catalog;
};
const CatalogPage: NextPageWithLayout<PageProps> = ({ catalog }) => {
  const router = useRouter();
  const deleteProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await Catalogs.Delete(catalog.ID as string);
    router.push(ApplicationRoutes.catalogs);
  };
  return (
    <>
      <div className={clsx("px-4 sm:px-6 py-4 border-b border-gray-200")}>
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h2
              className={clsx(
                "text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight"
              )}
            >
              {catalog.Name}
            </h2>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              <div
                className={clsx("mt-2 flex items-center text-sm text-gray-500")}
              >
                <span className="font-semibold">ID:</span>&nbsp;
                {catalog.ID}
              </div>
              {/* <div
              className={clsx("mt-2 flex items-center text-sm text-gray-500")}
            >
              <span className="font-semibold">Default catalog:</span>&nbsp;
              {buyer.DefaultCatalogID}
            </div>
            <div
              className={clsx("mt-2 flex items-center text-sm text-gray-500")}
            >
              <span className="font-semibold">Created:</span>&nbsp;
              {buyer.DateCreated}
            </div> */}
            </div>
          </div>
          <div className="hidden sm:flex mt-5 lg:ml-4 lg:mt-0">
            <span className="hidden sm:block">
              <button
                onClick={deleteProduct}
                type="button"
                className={clsx(
                  "inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold  shadow-sm ",
                  "bg-red-700 hover:bg-red-800 text-white"
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
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            defaultValue={tabs.find((tab) => tab.current)!.name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <Tab.Group as="div">
          <Tab.List className="-mb-px flex">
            {tabs.map((tab: any, index: number) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  clsx(
                    "w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium focus:outline-0",
                    selected
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels as="div">
            {tabs.map((tab: any, index: number) => (
              <Tab.Panel key={index}>
                <div className="px-4 sm:px-6 py-4">
                  {tab.name.toLowerCase() === "categories" && (
                    <CategoriesList catalog={catalog} />
                  )}
                  {tab.name.toLowerCase() === "product" && (
                    <span>Show associated products</span>
                  )}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default CatalogPage;

type returnType = {
  props: {
    catalog: Catalog;
  };
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return await authorizedOperation<returnType>(context, async () => {
    const { id } = context.query;
    return {
      props: {
        catalog: await Catalogs.Get(id as string),
      },
    };
  });
};
