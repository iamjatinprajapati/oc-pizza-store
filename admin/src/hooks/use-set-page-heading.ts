import { useEffect } from "react"

const useSetPageHeading = (heading: string) => {
    useEffect(() => {
        document.getElementById('pageHeading')!.innerHTML = heading
    }, [heading]);
}

export default useSetPageHeading;