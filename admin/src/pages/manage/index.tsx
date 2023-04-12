import useSetPageHeading from "@/hooks/use-set-page-heading"
import { NextPageWithLayout } from "@/types/base"

const IndexPage: NextPageWithLayout = () => {
    useSetPageHeading('Dashboard - updated')
    return (
        <></>
    )
}

export default IndexPage