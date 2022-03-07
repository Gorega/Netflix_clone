import {connectToDataBase} from "../../../../lib/db";
import {getSession} from "next-auth/react";

async function handler(req,res){
    
    if(req.method === "POST"){
        const {profileName} = req.query;
        const {list} = req.body;
        const session = await getSession({req});
        const client = await connectToDataBase();
        if(!session){
            return res.status(401).json({msg:"Unauthorized"});
        }
        
        const watchlist = await client.db().collection("users").updateOne({email:session.user.email,"profiles.name":profileName},{
            $addToSet:{"profiles.$.watchList":list}
        })
        
        return res.status(200).json({watchlist})
    }

}


export default handler;