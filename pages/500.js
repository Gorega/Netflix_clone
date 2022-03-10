import { useRouter } from "next/router"

export default function Custom500() {
    const router = useRouter();
    return <div className="not-found">
         <div>
            <h1>500 - Server-side error occurred</h1>
            <button onClick={()=> router.push("/dashboard")}>Home page</button>
         </div>
    </div>
  }