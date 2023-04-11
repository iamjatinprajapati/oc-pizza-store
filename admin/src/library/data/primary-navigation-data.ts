import { Bars4Icon, ClockIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";

export const primaryNavigation = [
    { name: 'Dashboard', href: '/manage', icon: HomeIcon, current: true, visibleTo: 'super_admin' },
    { name: 'Products', href: '/manage/products', icon: Bars4Icon, current: false, visibleTo: 'super_admin' },
]