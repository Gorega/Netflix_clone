import Head from "next/head";
import { useRouter } from "next/router";

export default function Custom500() {
   const router = useRouter();

    return <>
   <Head>
      <title>Error</title>
   </Head>
    <div className="not-found">
         <div>
            <h1>500 - Server-side error occurred</h1>
            <button onClick={()=> router.push("/")}>Home</button>
         </div>
    </div>
    </>
  }