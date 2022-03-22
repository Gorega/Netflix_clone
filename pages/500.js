import Head from "next/head";

export default function Custom500() {
    return <>
   <Head>
      <title>Error</title>
   </Head>
    <div className="not-found">
         <div>
            <h1>500 - Server-side error occurred</h1>
            <button onClick={()=> window.location.reload()}>Refresh page</button>
         </div>
    </div>
    </>
  }