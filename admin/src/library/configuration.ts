class AppConfiguration {
  public sellerAppAPIClientId: string;

  constructor() {
    this.sellerAppAPIClientId = process.env.SELLER_APP_API_CLIENTID || "";
  }
}

const appConfiguration = new AppConfiguration();
export default appConfiguration;
