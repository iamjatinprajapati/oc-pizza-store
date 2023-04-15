import { ApiRole } from "ordercloud-javascript-sdk/dist/models";

class AppConfiguration {
  public sellerAppAPIClientId: string;
  public sellerAdminScopes: Array<ApiRole>;
  public baseApiHost: string;

  constructor() {
    this.baseApiHost =
      process.env.BASE_API_HOST || process.env.NEXT_PUBLIC_BASE_API_HOST || "";
    this.sellerAppAPIClientId =
      process.env.SELLER_APP_API_CLIENTID ||
      process.env.NEXT_PUBLIC_SELLER_APP_API_CLIENTID ||
      "";
    const scopes =
      process.env.SELLER_ADMIN_USER_SCOPES ||
      process.env.NEXT_PUBLIC_SELLER_ADMIN_USER_SCOPES ||
      "";
    this.sellerAdminScopes =
      (scopes.toString().split("|") as Array<ApiRole>).map(
        (role: string) => role as ApiRole
      ) || [];
  }
}

const appConfiguration = new AppConfiguration();
export default appConfiguration;
