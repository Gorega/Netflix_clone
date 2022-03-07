import {connectToDataBase} from "../../../lib/db";
import {getSession} from "next-auth/react"

export default async function handler(req,res){
        
        const session = await getSession({req});
        if(!session){
            return res.status(401).json({msg:"Anauthorized"});
        }

        const client = await connectToDataBase();
        const user = await client.db().collection("users").findOne({email:session.user.email});

        if(!user){
            return res.status(404).json({msg:"Unexist user"});
        }
        
        return res.status(200).json({user});
}