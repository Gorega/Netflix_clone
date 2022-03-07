import AppProvider from '../ContextApi'
import '../styles/globals.css'
import {SessionProvider} from "next-auth/react";
import Router from 'next/router';
import "nprogress/nprogress.css"
import nprogress from 'nprogress';

  Router.events.on("routeChangeStart",()=> nprogress.start());
  Router.events.on("routeChangeComplete",()=> nprogress.done());
  Router.events.on("routeChangeError",()=> nprogress.done());

function MyApp({ Component, pageProps }) {

  return <>
  <AppProvider>
    <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
    </SessionProvider>
  </AppProvider>
  </>
}

export default MyApp
