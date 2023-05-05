import useSetPageHeading from "@/hooks/use-set-page-heading";
import { ApplicationRoutes } from "@/library/constants";
import { authorizedOperation } from "@/library/helper";
import { NextPageWithLayout } from "@/types/global";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { Catalog, Catalogs, ListPage } from "ordercloud-javascript-sdk";
type PageProps = {
  catalogs: ListPage<Catalog>;
};
const CatalogsPage: NextPageWithLayout<PageProps> = ({ catalogs }) => {
  useSetPageHeading("Catalogs");
  return (
    <>
      <div className="flex flex-row space-x-3 justify-end px-8 py-4">
        <Link
          href={ApplicationRoutes.createCatalog}
          type="button"
          className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Create new catalog
        </Link>
      </div>
      <div className="hidden sm:block">
        <div className="inline-block min-w-full border-b border-gray-200 align-middle">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-t border-gray-200">
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  ID
                </th>
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Name
                </th>
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Description
                </th>
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Category count
                </th>
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Active
                </th>
                {/* <th
          className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
          scope="col"
        >
          Created
        </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {catalogs.Items?.map((catalog: Catalog) => (
                <tr key={catalog.ID}>
                  <td className="px-6 py-3">
                    <Link
                      href={`${ApplicationRoutes.catalogs}/${catalog.ID}`}
                      className="text-indigo-500 hover:underline hover:text-indigo-700"
                    >
                      {catalog.ID}
                    </Link>
                  </td>
                  <td className="px-6 py-3">{catalog.Name}</td>
                  <td className="px-6 py-3">{catalog.Description}</td>
                  <td className="px-6 py-3">{catalog.CategoryCount}</td>
                  <td className="px-6 py-3">
                    {catalog.Active ? "Active" : "In-active"}
                  </td>
                  {/* <td className="px-6 py-3">{product}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CatalogsPage;

type returnType = {
  props: {
    catalogs: ListPage<Catalog>;
  };
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return await authorizedOperation<returnType>(context, async () => {
    const catalogs = await Catalogs.List();
    return {
      props: {
        catalogs: catalogs,
      },
    };
  });
};
