import ErrorLayout from "@/layouts/error";
import { ApplicationRoutes } from "@/library/constants";
import { NextPageWithLayout } from "@/types/global";
import Link from "next/link";
import { ReactElement, useEffect } from "react";

const Error500Page: NextPageWithLayout = () => {
  useEffect(() => {
    document.documentElement.classList.add("h-full");
    // document.body.classList.add("h-full");
    document.getElementById("__next")!.classList.add("relative", "isolate");
    return () => {
      document.documentElement.classList.remove("h-full");
      document
        .getElementById("__next")!
        .classList.remove("relative", "isolate");
    };
  }, []);
  return (
    <main>
      <img
        src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base font-semibold leading-8 text-white">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Something went wrong!
        </h1>
        <p className="mt-4 text-base text-white/70 sm:mt-6">
          Sorry, there must be something wrong happend while processing your
          request.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href={ApplicationRoutes.dashboard}
            className="text-sm font-semibold leading-7 text-white"
          >
            <span aria-hidden="true">&larr;</span> Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
};

Error500Page.getLayout = (page: ReactElement) => (
  <ErrorLayout>{page}</ErrorLayout>
);

export default Error500Page;
