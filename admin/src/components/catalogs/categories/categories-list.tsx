import PrimaryButton from "@/components/global/buttons/primary-button";
import Modal from "@/components/global/modal";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  Catalog,
  Categories,
  Category,
  ListPage,
} from "ordercloud-javascript-sdk";
import { Fragment, useEffect, useState } from "react";

type CategoriesListProps = {
  catalog: Catalog;
};

const CategoriesList = ({ catalog }: CategoriesListProps) => {
  const [categories, setCategories] = useState<ListPage<Category> | null>(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    (async () => {
      const categoriesList = await Categories.List(catalog.ID as string);
      setCategories(categoriesList);
    })();
  }, [catalog]);

  const btnAddCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowModal(true);
  };

  if (!categories) {
    return <>No categories found</>;
  }
  return (
    <>
      <div className="flex flex-col space-x-4">
        <div className="flex justify-end px-4 mb-3">
          <PrimaryButton onClick={btnAddCategoryClick}>
            Add category
          </PrimaryButton>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {categories.Items?.map((category: Category) => (
            <div
              key={category.ID}
              className="relative flex flex-row justify-between items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
            >
              <div>
                <div className="flex-shrink-0">
                  {/* <img
              className="h-10 w-10 rounded-full"
              src={category.imageUrl}
              alt=""
            /> */}
                </div>
                <div className="min-w-0 flex-1">
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {category.Name}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {category.Description}
                    </p>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative ml-auto">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Open options</span>
                  <EllipsisHorizontalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={clsx(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Add sub category
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={clsx(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Edit<span className="sr-only">, {category.Name}</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={clsx(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-red-900"
                          )}
                        >
                          Delete
                          <span className="sr-only">, {category.Name}</span>
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={(value: boolean) => {
          setShowModal(false);
        }}
      >
        <>Modal content</>
      </Modal>
    </>
  );
};

export default CategoriesList;
