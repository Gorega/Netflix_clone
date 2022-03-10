import AppProvider from '../ContextApi'
import '../styles/globals.css'
import {SessionProvider} from "next-auth/react";
import Router from 'next/router';
import nprogress from 'nprogress';
import "nprogress/nprogress.css"

  Router.events.on("routeChangeStart",()=> nprogress.start());
  Router.events.on("routeChangeComplete",()=> nprogress.done());
  Router.events.on("routeChangeError",()=> nprogress.done());

function MyApp({ Component, pageProps:{
  session,...pageProps
} }) {

  return <>
    <SessionProvider session={session}>
    <AppProvider>
    <Component {...pageProps} />
    </AppProvider>
    </SessionProvider>
  </>
}

export default MyApp
