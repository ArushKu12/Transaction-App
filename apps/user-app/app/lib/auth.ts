import db from "@repo/db/client"
import bcrypt from 'bcrypt'
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
       
          credentials: {
            phone: { label: "Phone Number", type: "text", placeholder: "123123",required:true },
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
                        name: existingUser.name,
                        phone:existingUser.number
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
                    name:user.name,
                    number:user.number
                }
            } catch (error) {
             console.error(error)   
            }

            return null;
          }
        })
      ]
    
}