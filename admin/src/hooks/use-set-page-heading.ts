import { useEffect } from "react";

const useSetPageHeading = (heading: string) => {
  useEffect(() => {
    document.getElementById("pageHeading")!.innerHTML = heading;
    document.getElementById("headingSection")!.classList.add("sm:flex");

    return () => {
      if (document.getElementById("headingSection")) {
        document.getElementById("headingSection")!.classList.remove("sm:flex");
      }
    };
  }, [heading]);
};

export default useSetPageHeading;
