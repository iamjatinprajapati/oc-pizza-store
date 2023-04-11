import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import LogOutMenuItem from "./logout-menu-item";
import { useSession } from "next-auth/react";

const UserAccountDropdownMobile = () => {
    const session = null;
    if (!session) {
        return <>{`TODO: IMPLEMENT THE COMPONENT`}</>
    }
    const user = session.data.user;
    return (
        <>
            <Menu as="div" className="relative ml-3">
                <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-8 w-8 rounded-full shadow-md"
                            src={user.image ?? ''}
                            alt={user.name ?? ''}
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href="#"
                                        className={clsx(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        View profile
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href="#"
                                        className={clsx(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Settings
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href="#"
                                        className={clsx(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Notifications
                                    </Link>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="py-1">
                            <LogOutMenuItem />
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default UserAccountDropdownMobile;