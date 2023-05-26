import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import withAuthorization from "./middlewares/withOCAuthorization";

const middleware: NextMiddleware = (
  request: NextRequest,
  event: NextFetchEvent
) => {
  //Setup the order cloud configuration
  // Configuration.Set({
  //   baseApiUrl: process.env.BASE_API_HOST,
  //   timeoutInMilliseconds: 20 * 1000,
  // });
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  return NextResponse.next();
};

export default withAuthorization(middleware, ["/admin"]);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
