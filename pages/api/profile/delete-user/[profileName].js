import {connectToDataBase} from "../../../../lib/db";
import {getSession} from "next-auth/react";

async function handler(req,res){
    if(req.method === "PATCH"){
        const {profileName} = req.query;  
        const session = await getSession({req});
        if(!session){
            return res.status(401).json({msg:"Unathorized"});
        }

        const client = await connectToDataBase();
        const user = await client.db().collection("users").findOneAndUpdate({email:session.user.email},{
            $pull:{profiles:{name:profileName}}
        })

        return res.status(200).json({msg:"deleted successfuly"});
    }

}

export default handler