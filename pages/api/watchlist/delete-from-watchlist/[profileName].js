import {connectToDataBase} from "../../../../lib/db";
import {getSession} from "next-auth/react";

async function handler(req,res){
    
    if(req.method === "PATCH"){
        const {profileName} = req.query;
        const {movieId} = req.body;
        const session = await getSession({req});
        const client = await connectToDataBase();
        if(!session){
            return res.status(401).json({msg:"Unauthorized"});
        }
        
        const watchlist = await client.db().collection("users").updateOne({email:session.user.email,"profiles.name":profileName},{
            $pull:{"profiles.$.watchList":{id:movieId}}
        })
        
        return res.status(200).json({watchlist})
    }

}


export default handler;