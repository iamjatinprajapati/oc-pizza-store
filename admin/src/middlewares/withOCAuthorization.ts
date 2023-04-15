import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const withAuthorization = (
  middleware: NextMiddleware,
  requireAuth: Array<string> = []
) => {
  return async (request: NextRequest, next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    console.log(pathname);
    if (requireAuth.some((path) => pathname.startsWith(path))) {
      //Get next-auth token
      const token = await getToken({
        req: request,
      });
      if (token && token.me) {
        //do nothing
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
    return middleware(request, next);
  };
};

export default withAuthorization;
