import {connectToDataBase} from "../../../../lib/db";
import {getSession} from "next-auth/react";

async function handler(req,res){
    const {profileName} = req.query;
    const {name,image} = req.body; 
    const client = await connectToDataBase();
    const session = await getSession({req});
    if(!session){
        return res.status(401).json({msg:"Unathorized"});
    }

    if(!name){
        client.close();
        return res.status(422).json({msg:"Name should not be empty"});
    }

        const profiles = await client.db().collection("users").findOne({email:session.user.email});
        const existProfileName = profiles.profiles.find((profile) => profile.name.toLowerCase() === name.toLowerCase())
        if(existProfileName){
            return res.status(422).json({msg:"Profile name is already exist, please choose anohter one"})
        }

    const user = await client.db().collection("users").updateOne({email:session.user.email,"profiles.name":profileName},{
        $set:{"profiles.$.name":name,"profiles.$.image":image}
    });

  return res.status(200).json({user});

}

export default handler