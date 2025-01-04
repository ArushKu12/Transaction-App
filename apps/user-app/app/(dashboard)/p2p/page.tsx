
import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { PeerTransactions } from "../../../components/PeerTransactions";

interface P2PTransaction {
    id:number;
    TimeStamp: Date;
    amount: number;
    fromUserId: number;
    toUserId: number;
}

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getp2pTransactions() {
    const session = await getServerSession(authOptions);
    const txns : P2PTransaction[] = await prisma.p2pTransfer.findMany({
        where: {
            OR:[
                {fromUserId : Number(session?.user.id)},
                {toUserId: Number(session?.user.id)}
            ]
        }
    });
    
    return txns.map(t => ({
        time: t.TimeStamp,
        amount: t.amount,
        fromUserId: t.fromUserId,
        toUserId: t.toUserId
    }))
}

export default async function () {

    const balance = await getBalance()
    const transactions = await getp2pTransactions()
    const session = await getServerSession(authOptions);

    const userId = session?.user.id;

    return <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <SendCard />
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="pt-4">
                        <PeerTransactions transactions={transactions} userId={Number(userId)} />
                    </div>
                </div>
            </div>
        </div>
}