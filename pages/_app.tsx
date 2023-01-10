import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { StoreProvider } from '../app/context'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <StoreProvider>
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)} exitBeforeEnter>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </StoreProvider>
  )
}

export default MyApp
