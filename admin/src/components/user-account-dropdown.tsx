import { Menu, Transition } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment } from "react"
import LogOutMenuItem from "./logout-menu-item"

const UserAccountDropdown = () => {
    const session = null, user = null;
    if (!session) {
        return <>{`TODO: IMPLEMENT THE COMPONENT`}</>
    }
    return (
        <>
            <Menu as="div" className="relative inline-block px-3 text-left">
                <div>
                    <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        <span className="flex w-full items-center justify-between">
                            <span className="flex min-w-0 items-center justify-between space-x-3">
                                <img
                                    className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                                    src={user?.image ?? ''}
                                    alt={user?.name ?? ''}
                                /><span className="flex min-w-0 flex-1 flex-col">
                                    <span className="truncate text-sm font-medium text-gray-900">{session.data!.user.name}</span>
                                    <span title={session.data!.user.email ? session.data!.user.email : ''} className="truncate text-sm text-gray-500">{session.data!.user.email}</span>
                                </span>
                            </span>
                            <ChevronUpDownIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                            />
                        </span>
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
                    <Menu.Items className="absolute left-0 right-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                            {/* <Menu.Item>
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
                            </Menu.Item> */}
                        </div>
                        {/* <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href="#"
                                        className={clsx(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Get desktop app
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
                                        Support
                                    </Link>
                                )}
                            </Menu.Item>
                        </div> */}
                        <div className="py-1">
                            <LogOutMenuItem />
                            {/* <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href="#"
                                        onClick={logOut}
                                        className={clsx(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Logout
                                    </Link>
                                )}
                            </Menu.Item> */}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default UserAccountDropdown