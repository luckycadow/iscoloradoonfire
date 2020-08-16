import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head key="app-head">
        <title>Is Colorado on Fire?</title>
        <meta
          name="description"
          content="Is Colorado on fire? Almost definitely, but now you can know for sure."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
