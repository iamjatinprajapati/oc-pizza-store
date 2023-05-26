import { Suppliers } from "ordercloud-javascript-sdk";
import { useEffect } from "react";

const ProductDetail = () => {
  return (
    <>
      <div className="grid gap-x-4 gap-y-5 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-md ring-1 ring-gray-900/5 shadow-sm">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 rounded-md shadow border border-gray-200">
          Right column
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
