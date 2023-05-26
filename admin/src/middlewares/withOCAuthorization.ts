import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { Me, MeUser, Tokens } from "ordercloud-javascript-sdk";

const withAuthorization = (
  middleware: NextMiddleware,
  requireAuth: Array<string> = []
) => {
  return async (request: NextRequest, next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (requireAuth.some((path) => pathname.startsWith(path))) {
      //Get next-auth token
      const token = await getToken({
        req: request,
      });
      if (token && token.me) {
        /**
         * Check if the valid token is present or not. In case of application restart, the in memory token vanishes.
         *
         * Note: With latest version of Next.js, in Edge Runtime the dynamic code evaluation (e.g., 'eval', 'new Function') not allowed
         * hence the middleware is not able to identify if the code is executing on the server or client for Tokens.GetValidToken().
         * so we have to check if token is valid or not on either in getServerSideProps / getStaticProps or client side.
         *
         * Keeping the following code commented for reference purpose.
         */
        try {
          // const token = await Tokens.GetValidToken();
          // if (!token) {
          //   return NextResponse.redirect(new URL("/login", request.url));
          // }
        } catch (error) {
          console.log(error);
        }
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
    return middleware(request, next);
  };
};

export default withAuthorization;
