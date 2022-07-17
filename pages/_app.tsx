import type { AppProps } from 'next/app'

import Head from 'next/head'
import Script from 'next/script'

import * as gtag from '../lib/GTag'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import '../styles/acrylic.css'

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <>
            <Head>
                <title>Matthew McCall | mmccall.dev</title>
                <meta name="description" content="My name is Matthew McCall, I am currently a C++ developer working on game engines!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
