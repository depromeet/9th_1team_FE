import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import { useApollo } from "../lib/apolloClient";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        <script
          crossOrigin="true"
          type="text/javascript"
          src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
          charSet="utf-8"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
          Kakao.init("${process.env.NEXT_PUBLIC_KAKAO_ID}"); 
          Kakao.isInitialized();
        `,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
