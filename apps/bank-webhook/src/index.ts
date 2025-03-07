import express from 'express';
import db from "@repo/db/client"
// import z from 'zod';

const app = express();

app.use(express.json())

// const paymentInfo = z.object({
//     token : z.string(),
//     user_identifier : z.string(),
//     amount : z.string()
// })

app.post("/hdfcwebhook", async (req,res) : Promise<void> => {

    const paymentInformation : {
        token : string,
        userId : string,
        amount : string
    } = {
        token : req.body.token,
        userId : req.body.user_identifier,
        amount : req.body.amount
    }

    

    const txn_status = await db.onRampTransaction.findFirst({
        where:{
            token:paymentInformation.token
        }
    })

    // if(txn_status?.status != "Processing") res.status(403).json({message:"No Such transaction in Processing"})

    try {
        await db.$transaction([
            db.balance.update({
                where:{
                    userId: Number(paymentInformation.userId)
                },
                data:{
                    amount:{
                        increment:Number(paymentInformation.amount)
                    }
                }
            }),
        
            db.onRampTransaction.updateMany({
                where:{
                    token:paymentInformation.token
                },
                data:{
                    status:"Success"
                }
            })
        ])
        res.json({
            message:"Captured"
        })
        
    } catch (error) {
        console.error(error)
        res.status(411).json({
            message:"Error while Processing webhook"
        })
    }
   
})

app.listen(3003,() => {
    console.log("Server Started on Port 3003")
})