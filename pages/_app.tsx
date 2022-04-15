import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import { COLORS } from '../constants/theme';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  body {
    background: ${COLORS.defaultBackground};
  }

  #__next {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }
`


function MyApp({ Component, pageProps }) {
  return (
    <>      
      <Head>
        <title>Is Colorado on Fire?</title>
        <meta
          name="description"
          content="Is Colorado on fire? Almost definitely, but now you can know for sure."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
