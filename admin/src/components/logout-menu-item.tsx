import { Menu } from "@headlessui/react";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const LogOutMenuItem = () => {
  const router = useRouter();
  const logOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut({ redirect: true, callbackUrl: "/login" });
  };
  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <Link
            href="#"
            onClick={logOut}
            className={clsx(
              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
              "block px-4 py-2 text-sm"
            )}
          >
            Logout
          </Link>
        )}
      </Menu.Item>
    </>
  );
};

export default LogOutMenuItem;
