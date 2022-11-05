import {Html, Main, NextScript, Head } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#2b2e30" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
