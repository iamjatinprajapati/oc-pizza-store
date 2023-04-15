import { IRouteItem, RouteItem } from "@/types/global";
import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { ApplicationRoutes } from "../constants";

class Routes {
  private _routes: Array<IRouteItem> = [
    new RouteItem(
      "Dashboard",
      ApplicationRoutes.dashboard,
      ["Seller"],
      HomeIcon
    ),
    new RouteItem("Buyers", ApplicationRoutes.buyers, ["Seller"], UsersIcon),
  ];

  get routes() {
    return this._routes;
  }
}

const primaryNavigation = new Routes();

export default primaryNavigation;
