import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";
import { Session } from "next-auth";
import { ReactElement, ReactNode } from "react";

export type BasePageProps = {
  children: ReactElement;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AuthenticatedPageProps = {
  session: Session;
};

export type TempUser = {
  image: string;
  name: string;
  email?: string;
};

export interface IRouteItem {
  name: string;
  href: string;
  icon?: any;
  currentPathClass(pathToCheck: string): string;
  currentIconClass(pathToCheck: string): string;
  children?: Array<IRouteItem>;
  allowedRoles: Array<string>;
}

export class RouteItem implements IRouteItem {
  private selectedItemClassName: string = "bg-gray-200 text-gray-900";
  private normalItemClassName: string =
    "text-gray-700 hover:bg-gray-50 hover:text-gray-900";

  private selectedItemIconClassName: string = "text-gray-500";
  private normalItemIconClassName: string =
    "text-gray-400 group-hover:text-gray-500";

  constructor(
    public name: string,
    public href: string,
    public allowedRoles: Array<string>,
    public icon?: any,
    public children?: Array<IRouteItem>
  ) {}

  currentPathClass(pathToCheck: string): string {
    if (this.href === pathToCheck || pathToCheck.indexOf(this.href) > -1) {
      return this.selectedItemClassName;
    }
    return this.normalItemClassName;
  }

  currentIconClass(pathToCheck: string): string {
    if (this.href === pathToCheck || pathToCheck.indexOf(this.href) > -1) {
      return this.selectedItemIconClassName;
    }
    return this.normalItemIconClassName;
  }
}
