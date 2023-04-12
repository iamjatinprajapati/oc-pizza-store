import useSetPageHeading from "@/hooks/use-set-page-heading"
import { NextPageWithLayout } from "@/types/base"

const IndexPage: NextPageWithLayout = () => {
    useSetPageHeading('Dashboard')
    return (
        <></>
    )
}

export default IndexPage