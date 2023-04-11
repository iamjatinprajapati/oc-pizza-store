import { primaryNavigation } from '@/library/data/primary-navigation-data';
import { isCurrentNavItem } from '@/library/helper';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
const PrimaryNavigation = () => {
    const session = null
    const router = useRouter()
    if (!session) {
        return <>{`TODO: IMPLEMENT THE COMPONENT`}</>
    }
    let navigation = primaryNavigation;

    return (
        <>
            <nav className="mt-6 px-3">
                <div className="space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                isCurrentNavItem(router.pathname, item.href) ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                            )}
                            aria-current={isCurrentNavItem(router.pathname, item.href) ? 'page' : undefined}
                        >
                            <item.icon
                                className={clsx(
                                    isCurrentNavItem(router.pathname, item.href) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                    'mr-3 h-6 w-6 flex-shrink-0'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav></>
    )
}

export default PrimaryNavigation;