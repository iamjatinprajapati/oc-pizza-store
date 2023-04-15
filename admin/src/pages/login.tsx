import GuestLayout from "@/layouts/guest";
import { NextPageWithLayout } from "@/types/global";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useRef, useState } from "react";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { error } = router.query;
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(
    error && error.toString().toLowerCase() === "credentialssignin"
  );
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const loginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setShowError(false);
    if (usernameInputRef.current && passwordInputRef.current) {
      try {
        await signIn("credentials", {
          redirect: true,
          username: usernameInputRef.current.value,
          password: passwordInputRef.current.value,
          callbackUrl: "/admin/dashboard",
        });
      } catch (error) {
        setLoading(false);
        setShowError(true);
      }
    }
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Image
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg"
              alt="TechConsult"
              width="56"
              height="48"
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-8">
            {showError && (
              <span className="mb-5 text-red-600">
                Invalid credentails or something went wrong.
              </span>
            )}
            <div className="mt-6">
              <form
                onSubmit={loginSubmit}
                action="#"
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      ref={usernameInputRef}
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="off"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      ref={passwordInputRef}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center"></div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  {!loading && (
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  )}
                  {loading && (
                    <span className="flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                      Signing in...
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={`https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80`}
          alt="Login"
          width={`1024`}
          height={`1260`}
        />
      </div>
    </>
  );
};

LoginPage.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default LoginPage;
