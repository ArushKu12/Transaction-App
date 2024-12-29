import db from "@repo/db/client"
import bcrypt from 'bcrypt'
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({

          name: "Credentials",
       
          credentials: {
            phone: { label: "Phone Number", type: "text", placeholder: "eg : Dosw@3221",required:true },
            password: { label: "Password", type: "password",required:true }
          },
          async authorize(credentials : any, req ) {
            const hashedPassword = await bcrypt.hash(credentials?.password,10)
            
            const existingUser = await db.user.findFirst({
                where:{
                    number : credentials.phone
                }
            })

            if(existingUser){
                const PasswordValidation = await bcrypt.compare(credentials.password,existingUser.password)
                if(PasswordValidation){
                    return {
                        id:existingUser.id.toString(),
                        name: existingUser.name || "Anonymous",
                        email:existingUser.number
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data:{
                        number:credentials.phone,
                        password:hashedPassword
                    }
                })
                return {
                    id:user.id.toString(),
                    name:user.name || "Anonymous",
                    email:user.number
                }
            } catch (error) {
             console.error(error)   
            }

            return null;
          }
        })
      ],
      session:{
        strategy:'jwt'
      },
      jwt:{
        secret : process.env.NEXTAUTH_SECRET
      }
    
}