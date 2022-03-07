import {getSession} from "next-auth/react";
import {connectToDataBase} from "../../../lib/db";

async function handler(req,res){
    if(req.method === "POST"){
        const {name,image} = req.body;
        const session = await getSession({req});
        if(!session){
            return res.status(401).json({msg:"Unauthorized"})
        }
        
        const client = await connectToDataBase();
        const user = await client.db().collection("users").updateOne({email:session.user.email},{
            $push:{profiles:{name,image,watchList:[]}}
        })

        return res.status(201).json({msg:"new profile added successfuly"})
        
    }
}

export default handler