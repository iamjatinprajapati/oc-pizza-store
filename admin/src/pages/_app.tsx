import AuthenticatedLayout from '@/layouts/authenticated-layout'
import '@/styles/globals.css'
import { NextPageWithLayout } from '@/types/base'
import type { AppProps } from 'next/app'
import { ReactElement } from 'react'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout,
}

const getDefaultLayout = (page: ReactElement) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? getDefaultLayout;
  return getLayout(<Component {...pageProps} />)
}