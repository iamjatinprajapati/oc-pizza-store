import { NextPage } from "next"
import { Session } from "next-auth"
import { SessionContextValue } from "next-auth/react"
import { ReactElement, ReactNode } from "react"

export type BasePageProps = {
    children: ReactElement
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

export type AuthenticatedPageProps = {
    session: Session
}

export type TempUser = {
    image: string;
    name: string;
    email?: string;
}