class ApplicationRoutes {
  public static dashboard: string = "/admin/dashboard";
  public static buyers: string = "/admin/buyers";
  public static createBuyer: string = "/admin/buyers/create";
  public static users: string = "/admin/buyers/[buyer]/users";
  public static addresses: string = "/admin/buyers/[buyer]/addresses";
  public static creditCards: string = "/admin/buyers/[buyer]/credit-cards";
  public static login: string = "/login";
}

export { ApplicationRoutes };
