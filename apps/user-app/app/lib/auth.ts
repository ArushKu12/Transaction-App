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
            
            const existingUser = await db.user.findFirst({
                where:{
                    number : credentials.phone
                }
            })

            if(existingUser){
                const PasswordValidation = credentials.password === existingUser.password
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
              const hashedPassword = await bcrypt.hash(credentials?.password,10)

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
      secret: process.env.NEXTAUTH_SECRET || "secret",
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
              token.sub = user.id; // Ensure the `id` is added to the token
          }
          return token;
      },
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
    
}