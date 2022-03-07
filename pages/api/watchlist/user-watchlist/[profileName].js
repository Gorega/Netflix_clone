import {connectToDataBase} from "../../../../lib/db";
import {getSession} from "next-auth/react";

async function handler(req,res){
    
    if(req.method === "GET"){
        const {profileName} = req.query;
        const session = await getSession({req});
        const client = await connectToDataBase();
        if(!session){
            return res.status(401).json({msg:"Unauthorized"});
        }
        
        const user = await client.db().collection("users").findOne({email:session.user.email});
        const list = user.profiles.filter((profile)=> profile.name.toLowerCase() === profileName.toLowerCase());
        return res.status(200).json({list})
    }

}


export default handler;