import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html,
  body {
    font-size: 10px;
    margin: 0;
    font-family: "Noto Sans KR";
    color: #343a40;
    height: 100%;
  }
  
  #__next {
    height: 100%;
  }

@font-face {
  font-family: "NanumSquareRound";
  font-weight: 400;
  src: url("https://cdn.jsdelivr.net/npm/typeface-nanum-square-round@1.0.2/NanumSquareRoundR.woff") format('woff');
}
@font-face {
  font-family: "NanumSquareRound";
  font-weight: 700;
  src: url("https://cdn.jsdelivr.net/npm/typeface-nanum-square-round@1.0.2/NanumSquareRoundB.woff") format('woff');
}
@font-face {
  font-family: "NanumSquareRound";
  font-weight: 800;
  src: url("https://cdn.jsdelivr.net/npm/typeface-nanum-square-round@1.0.2/NanumSquareRoundEB.woff") format('woff');
}
@font-face {
  font-family: 'Noto Sans KR';
  src: url("https://cdn.jsdelivr.net/npm/noto-sans-kr@0.1.1/fonts/NotoSans-Regular.woff") format('woff');
  font-style: normal;
  font-weight: 400;
}


`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <>
                <GlobalStyles />
                <App {...props} />
              </>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <script src="https://developers.kakao.com/sdk/js/kakao.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
