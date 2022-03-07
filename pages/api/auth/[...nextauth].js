import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {compare} from "bcrypt";
import {connectToDataBase} from "../../../lib/db";

export default nextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            async authorize(credentials){
                    const client = await connectToDataBase();
                    const user = await client.db().collection("users").findOne({email:credentials.email})

                    if(!user){
                        throw new Error("no such email exist")
                    }
                    // compare hashed password
                    const comparePassword = await compare(credentials.password,user.password);

                    if(!comparePassword){
                        throw new Error("Incorrect Email or Password")
                    }
                    return{ email:user.email}
            }
        })
    ]
})