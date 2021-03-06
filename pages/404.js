import Head from "next/head";
import { useRouter } from "next/router"

export default function Custom404(){
    const router = useRouter();
    return <>
        <Head>
            <title>Not Found</title>
        </Head>
        <div className="not-found">
         <div>
            <h1>404 - Page Not Found</h1>
            <button onClick={()=> router.push("/dashboard")}>Home page</button>
         </div>
        </div>
    </>
}