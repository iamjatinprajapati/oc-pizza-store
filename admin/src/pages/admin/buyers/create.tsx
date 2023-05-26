import ToggleWithIcon from "@/components/global/toggle-with-icon";
import TwoColumnSection from "@/components/global/two-column-section";
import { ApplicationRoutes } from "@/library/constants";
import { NextPageWithLayout } from "@/types/global";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Buyer, Buyers } from "ordercloud-javascript-sdk";
import { useRef, useState } from "react";

const CreateBuyerPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [active, setActive] = useState(true);
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const defaultCatalogIdInputRef = useRef<HTMLInputElement | null>(null);

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInputRef.current) {
      const buyer: Buyer = {
        Name: nameInputRef.current.value,
      };
      if (idInputRef.current) {
        buyer.ID = idInputRef.current.value;
      }
      if (defaultCatalogIdInputRef.current) {
        buyer.DefaultCatalogID = defaultCatalogIdInputRef.current.value;
      }
      buyer.Active = active;
      //Create the buyer organization from client side.
      const response = await Buyers.Create(buyer);
      console.log(response);
      router.push(ApplicationRoutes.buyers);
    } else {
      alert("Name field is required");
    }
  };

  return (
    <>
      <div className="px-4 sm:px-6">
        <TwoColumnSection
          heading="Buyer organization details"
          shortDescription="Add basic details about the buyer organization"
        >
          <form
            onSubmit={formSubmit}
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      ref={nameInputRef}
                      type="text"
                      name="name"
                      id="name"
                      required
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ID
                  </label>
                  <div className="mt-2">
                    <input
                      ref={idInputRef}
                      type="text"
                      name="id"
                      id="id"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span className="text-xs">
                      ID will be generated automatically if not provided
                    </span>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="defaultCatalogId"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Default catalog id
                  </label>
                  <div className="mt-2">
                    <input
                      ref={defaultCatalogIdInputRef}
                      type="text"
                      name="defaultCatalogId"
                      id="defaultCatalogId"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span className="text-xs">
                      Default catalog id will be generated automatically if not
                      provided
                    </span>
                  </div>
                </div>
                <div className="col-span-full">
                  <ToggleWithIcon
                    label="Active"
                    enabled={active}
                    onChange={setActive}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <Link
                href={ApplicationRoutes.buyers}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </TwoColumnSection>
      </div>
    </>
  );
};

export default CreateBuyerPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {},
  };
};
