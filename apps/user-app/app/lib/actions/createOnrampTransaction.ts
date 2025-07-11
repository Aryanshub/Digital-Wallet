"use server"
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function createOnrampTransaction(amount: number, provider : string){
    const session = await getServerSession(authOptions);
   const userId = session?.user.id;
   const token = Math.random().toString(36)

   if (!userId) {
    return "User  Not Loged -In"


} 
try {
    
    const onRamping = await db.$transaction([
        db.onRampTransaction.create({
            data:{
            userId : parseInt(userId),
            amount:amount,
            //amount:amount * 100
            status : "Processing",
            startTime: new Date(),
            provider: provider,
            token : token
            
        }
        }),
        // //here is no need to update balance because the hadfc/axis/or any provider does get the request to ouer webhook handler ( over seprate backend server ) and it will update the balance and also update the staus like success . failure, and processing......
     
    ])
return {
    message : "Onramp transaction created successfully",
  
    
}

    
} catch (error) {
    console.error("Error creating onramp transaction:", error);
    return "Error creating onramp transaction";
    
} 
}

