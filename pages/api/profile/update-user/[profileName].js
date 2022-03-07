import {connectToDataBase} from "../../../../lib/db";
import {getSession} from "next-auth/react";

async function handler(req,res){
    const {profileName} = req.query;
    const {name,image} = req.body; 
    const session = await getSession({req});
    if(!session){
        return res.status(401).json({msg:"Unathorized"});
    }

    const client = await connectToDataBase();
    const user = await client.db().collection("users").updateOne({email:session.user.email,"profiles.name":profileName},{
        $set:{"profiles.$.name":name,"profiles.$.image":image}
    });

  return res.status(200).json({user});

}

export default handler