import type { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import '../styles/acrylic.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Matthew McCall | mmccall.dev</title>
                <meta name="description" content="My name is Matthew McCall, I am currently a C++ developer working on game engines!" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
