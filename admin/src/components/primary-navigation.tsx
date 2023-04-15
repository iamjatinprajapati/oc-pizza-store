import primaryNavigation from "@/library/data/primary-navigation-data";
import { isCurrentNavItem } from "@/library/helper";
import { IRouteItem } from "@/types/global";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
const PrimaryNavigation = () => {
  const router = useRouter();

  let navigation = primaryNavigation.routes;

  return (
    <>
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigation.map((item: IRouteItem) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                item.currentPathClass(router.pathname),
                "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
              )}
              aria-current={
                isCurrentNavItem(router.pathname, item.href)
                  ? "page"
                  : undefined
              }
            >
              <item.icon
                className={clsx(
                  item.currentIconClass(router.pathname),
                  "mr-3 h-6 w-6 flex-shrink-0"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default PrimaryNavigation;
