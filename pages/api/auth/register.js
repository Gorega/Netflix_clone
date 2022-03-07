import {connectToDataBase} from "../../../lib/db"; 
import {hash} from "bcrypt";

async function handler(req,res){
    const {email,password} = req.body;
    try{
        if(req.method === "POST"){
            if(!email || !password || password.length < 8){
                return res.status(422).json({msg:"Invlid input"});
            }

            const hashedPassword = await hash(password,10);

            const client = await connectToDataBase();
            const db = client.db();
            
            // check for user duplicates
            const existUser = await db.collection("users").findOne({email:email});
            if(existUser){
                return res.status(422).json({msg:"Email is already exist"})
            }

            db.collection("users").insertOne({email:email,password:hashedPassword,
            profiles:[{
                name:"User",
                image:"https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
                watchList:[]
            }]
            });
            return res.status(201).json({msg:"user created successfuly"})
        }
    }catch(err){
        return res.status(500).json({msg:"somthing went wrong!"});
    }

}

export default handler;