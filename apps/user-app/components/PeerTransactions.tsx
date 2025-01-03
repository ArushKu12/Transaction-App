import { Card } from "@repo/ui/card"



export const PeerTransactions = ({
    transactions , userId
}: {
    transactions: {
        time: Date,
        amount: number,
        fromUserId : number,
        toUserId : number
    }[],
    userId : number
}) : JSX.Element=> {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent Peer transactions
            </div>
        </Card>
    }
    return <Card title="Recent Peer Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        {userId === t.fromUserId ? "Sent INR" : "Recieved INR"}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    {t.fromUserId === userId ? "-" : "+"} Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}