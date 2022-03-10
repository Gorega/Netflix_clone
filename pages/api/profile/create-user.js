import {getSession} from "next-auth/react";
import {connectToDataBase} from "../../../lib/db";

async function handler(req,res){
    if(req.method === "POST"){
        const {name,image} = req.body;
        const client = await connectToDataBase();
        const session = await getSession({req});
        if(!session){
            client.close();
            return res.status(401).json({msg:"Unauthorized"})
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

        if(profiles.profiles.length >= 4){
            return res.status(422).json({msg:"You have reached the maximum profiles, you can't add more"})
        }
        
        const user = await client.db().collection("users").updateOne({email:session.user.email},{
            $push:{profiles:{name,image,watchList:[]}}
        })

        return res.status(201).json({msg:"new profile added successfuly"})
        
    }
}

export default handler