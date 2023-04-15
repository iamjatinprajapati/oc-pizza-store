import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { Configuration } from "ordercloud-javascript-sdk";

const middleware: NextMiddleware = (
  request: NextRequest,
  event: NextFetchEvent
) => {
  //Setup the order cloud configuration
  Configuration.Set({
    baseApiUrl: process.env.BASE_API_HOST,
    timeoutInMilliseconds: 20 * 1000,
  });
  console.log("request path");
  console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  return NextResponse.next();
};

export default middleware;

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