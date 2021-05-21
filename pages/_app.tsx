import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import { useApollo } from "../lib/apolloClient";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
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
