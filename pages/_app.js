import "../styles/globals.css";
import Layout from "../components/Layout";
import { ThemeProvider } from "next-themes";
import { MDXProvider } from "@mdx-js/react";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function Site({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  });
  return (
    <ThemeProvider attribute="class">
      <LoadingBar
        color={"#4CE0B3"}
        progress={progress}
        height={3}
        onLoaderFinished={() => setProgress(0)}
      />
      <Layout>
        <MDXProvider>
          <Head>
            <title>creativcoder</title>
            <meta
              name="viewport"
              content="initial-scale=1, viewport-fit=cover, user-scalable=no"
            />
          </Head>
          <Component {...pageProps} />;
        </MDXProvider>
      </Layout>
    </ThemeProvider>
  );
}

export default Site;
