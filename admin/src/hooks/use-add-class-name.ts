import { FiraCode } from "@/library/utils/fonts";
import { useEffect } from "react";

const useAddClassName = (className: string) => {
    useEffect(() => {
        document.getElementById("__next")!.className = `${className}`;
        document.getElementsByTagName(
            "body"
        )[0]!.className = `h-full app-font ${FiraCode.className}`;
    }, [className]);
};

export default useAddClassName;
