import { Head, Html, Main, NextScript } from "next/document";
import dynamic from "next/dynamic";
import Script from "next/script";
import React from "react";
const PreviewDocument = dynamic(() => import('../Components/PreviewDocument'), { ssr: false })

function MyDocument(props) {
  const pageUrl = props.__NEXT_DATA__.page
  return (
    <>
      {
        (pageUrl.indexOf('/preview') != '-1') ?
          <Html
            lang="en"
            data-layout="vertical"
            data-topbar="light"
            data-sidebar="light"
            data-sidebar-size="lg"
            data-sidebar-image="none"
            data-layout-style="default"
            data-layout-mode="light"
            data-layout-width="fluid"
            data-layout-position="fixed"
          >
            <Head>
              <link href="/font-awesome/css/all.css" />
              {/* <script src="/js/layout.js" async></script>
              <Script src="https://cdn.lordicon.com/fudrjiwc.js" strategy="beforeInteractive" /> */}
            </Head>
            <body>
              <Main />
              <NextScript />
              {/* <Script src="/libs/bootstrap/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
              */}
              <Script src="/font-awesome/js/all.min.js" strategy="beforeInteractive" />
            </body>
          </Html>
        : (pageUrl.indexOf('/login') != '-1' || pageUrl.indexOf('/register') != '-1') ?
            <Html
            lang="en"
            data-layout="vertical"
            data-topbar="light"
            data-sidebar="light"
            data-sidebar-size="lg"
            data-sidebar-image="none"
            data-layout-style="default"
            data-layout-mode="light"
            data-layout-width="fluid"
            data-layout-position="fixed"
          >
            <Head>
              <link href="/font-awesome/css/all.css" />
            </Head>
            <body>
              <Main />
              <NextScript />
              <Script src="/font-awesome/js/all.min.js" strategy="beforeInteractive" />
            </body>
          </Html>
        :
        <Html
          lang="en"
          data-layout="vertical"
          data-topbar="light"
          data-sidebar="light"
          data-sidebar-size="lg"
          data-sidebar-image="none"
          data-layout-style="default"
          data-layout-mode="light"
          data-layout-width="fluid"
          data-layout-position="fixed"
        >
          <Head>
            <link href="/font-awesome/css/all.css" />
            <script src="/js/layout.js" async></script>
            <Script src="https://cdn.lordicon.com/fudrjiwc.js" strategy="beforeInteractive" />
            {/* <link href="/libs/nouislider/nouislider.min.css" /> */}
            {/* <script src="/js/layout.js" async></script>
            <script src="/js/font-awesome-config.js" async></script> */}
            {/* <script src="/libs/bootstrap/js/bootstrap.bundle.min.js" async></script>
            <script src="/libs/feather-icons/feather.min.js" async></script> */}
          </Head>
          <body>
            <Main />
            <NextScript />
            <Script src="//cdn.jsdelivr.net/npm/sweetalert2@11" strategy="beforeInteractive" />
            <Script src="/libs/node-waves/waves.min.js" strategy="beforeInteractive" />
            <Script src="/libs/simplebar/simplebar.min.js" strategy="beforeInteractive" />
            <Script src="/libs/bootstrap/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
            <Script src="/font-awesome/js/all.min.js" strategy="beforeInteractive" />
            <Script src="/libs/feather-icons/feather.min.js" strategy="beforeInteractive" />
            {
              (pageUrl.indexOf('/complete-account') != '-1' || pageUrl.indexOf('/verification-number') != '-1' || pageUrl.indexOf('/start') != '-1') ? ''
              :
              <Script src="/js/main.js" strategy="lazyOnload" />
            }
          </body>
        </Html>
      }
    </>
  );
}

export default MyDocument;