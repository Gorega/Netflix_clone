import {connectToDataBase} from "../../../../lib/db";
import {getSession} from "next-auth/react";

async function handler(req,res){
    const {profileName} = req.query;
    const session = await getSession({req});
    if(!session){
        return res.status(401).json({msg:"Unathorized"});
    }

    const client = await connectToDataBase();
    const user = await client.db().collection("users").findOne({email:session.user.email});
    const profile = user.profiles.filter((profile)=> profile.name.toLowerCase() === profileName.toLowerCase())

  return res.status(200).json({profile});

}

export default handler