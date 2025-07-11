// //Server action to handle P2P transaction creation
// "use server";
// import db  from "@repo/db/client";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../lib/auth";


// interface P2PTransactionRequest {
   
//     receiverId : string,
//     amount : number
// }

// // This function handles the P2P transaction logic
// export async function paySomeone({receiverId , amount}: P2PTransactionRequest){
//     const session = await getServerSession(authOptions);
    
//     if(!session || !session.user.id){
//         return {
//             error: "Unauthorized"   
//     }
// }
// const senderId = parseInt(session.user.id)

// if(!receiverId || !amount){
//     return {
//         error: "Invalid request"
//     }       
// }
// if (amount <= 0){
//     return {
//         error: "Amount must be greater than zero"
//     }
// }


// // Create the transaction
// try {
//     const [sender , receiver] = await Promise.all([
//         db.user.findUnique({

//             where: { id: senderId },
//             select:{id: true, Balance:{select:{
//                 amount: true
//             }}}
//         }),
//         db.user.findUnique({
//             where: { number : receiverId },
//             select: {
//   id: true,
//   Balance: {
//     select: { amount: true }
//   }
// }

            
//         })

    
//     ]);
    
//      if (receiver?.id === senderId) {
//     return { error: "Cannot pay to yourself" }
//   }
//     if(!sender || !receiver){
//         return {
//             error: "User not found (Invaild sender or receiver ID)"
//         }
//     }
//     if(typeof sender.Balance?.amount !== "number" || sender.Balance.amount < amount){
//         return {
//             error: "Insufficient balance"
//         }
//     }
//     const [updateSender , updateReceiver] = await db.$transaction([
        
//         db.user.update({
//             where: {id:senderId},
//             data:{
//                 Balance: {
//                     update: {
//                         amount: {
//                             decrement: amount
//                         }
//                     }
//                 }
//             }
//         }),
//         db.user.update({
//             where:{number: receiverId},
//             data:{
//                 Balance:{
//                     update:{
//                         amount:{
//                             increment: amount
//                         }
//                     }
//                 }
//             },
//             select: {
//   id: true,
//   Balance: true
// }

            
//         }),

//         db.p2PTransaction.create({
//             data: {
//                 senderId: sender.id,
//                 receiverId: receiver.id,
//                 amount: amount,
//                 status: "Success"
//             },
//             select: {
//                 id: true,
//                 createdAt: true
//             }
//         })

//     ])
// return {
//     message: "Transfer successful ! ",
//     from: updateSender,
//     to: updateReceiver,
//   };
// } catch(e){
//     console.error("Error during transaction:", e);
//     return {
//         error: "Transaction failed"
//     }
              
    
// }

 

// }

"use server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

interface P2PTransactionRequest {
  receiverId: string; // Phone number
  amount: number;
}

export async function paySomeone({ receiverId, amount }: P2PTransactionRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    return { error: "Unauthorized" };
  }

  const senderId = parseInt(session.user.id);

  if (!receiverId || amount <= 0) {
    return { error: "Invalid request" };
  }

  try {
    // Fetch sender and receiver user IDs
    const [sender, receiver] = await Promise.all([
      db.user.findUnique({
        where: { id: senderId },
        select: { id: true }
      }),
      db.user.findUnique({
        where: { number: receiverId },
        select: { id: true }
      })
    ]);

    if (!sender || !receiver) {
      return { error: "Invalid sender or receiver" };
    }

    if (sender.id === receiver.id) {
      return { error: "Cannot send to yourself" };
    }

    // Perform atomic transaction with locking
    const result = await db.$transaction(async (tx) => {
      // Lock balances to prevent concurrent updates
      const senderBalances = await tx.$queryRaw<
        { id: number; userId: number; amount: number }[]
      >`SELECT * FROM "Balance" WHERE "userId" = ${sender.id} FOR UPDATE`;
      const receiverBalances = await tx.$queryRaw<
        { id: number; userId: number; amount: number }[]
      >`SELECT * FROM "Balance" WHERE "userId" = ${receiver.id} FOR UPDATE`;

      const senderBalance = senderBalances[0];
      const receiverBalance = receiverBalances[0];

      if (!senderBalance || senderBalance.amount < amount) {
        throw new Error("Insufficient balance");
      }

      const updateSender = await tx.user.update({
        where: { id: sender.id },
        data: {
          Balance: {
            update: {
              amount: { decrement: amount }
            }
          }
        }
      });

      const updateReceiver = await tx.user.update({
        where: { id: receiver.id },
        data: {
          Balance: {
            update: {
              amount: { increment: amount }
            }
          }
        },
        select: {
          id: true,
          Balance: true
        }
      });

      const transaction = await tx.p2PTransaction.create({
        data: {
          senderId: sender.id,
          receiverId: receiver.id,
          amount: amount,
          status: "Success"
        },
        select: {
          id: true,
          createdAt: true
        }
      });

      return {
        message: "Transfer successful!",
        from: updateSender,
        to: updateReceiver,
        transaction
      };
    });

    return result;
  } catch (e) {
    console.error("Transaction error:", e);
    return { error: "Transaction failed" };
  }
}
