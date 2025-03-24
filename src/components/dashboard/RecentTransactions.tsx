// components/dashboard/RecentTransactions.tsx
import { Transaction } from '../../hooks/useTransactions';
import { Badge } from '../../components/ui/badge';
import {Avatar, AvatarFallback, AvatarImage} from '../../components/ui/avatar.tsx';
// import { formatters } from '../../lib/utils.ts';

interface RecentTransactionsProps {
    transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
    const transactionList = Array.isArray(transactions) ? transactions : [];

    return (
        <div className="space-y-4">
            {transactionList.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No recent transactions</p>
            ) : (
                transactionList.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-9 w-9">
                                <AvatarImage
                                    src={transaction.customer || ''}
                                    alt={transaction.customer || 'Customer'}
                                />
                                <AvatarFallback>
                                    {transaction.customer
                                        ? transaction.customer.split(' ').map(n => n[0]).join('').toUpperCase()
                                        : ''}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium leading-none">{transaction.customer}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge
                                variant={
                                    transaction.status === 'succeeded' ? 'default' :
                                        transaction.status === 'pending' ? 'outline' : 'destructive'
                                }
                                className="capitalize"
                            >
                                {transaction.status}
                            </Badge>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default RecentTransactions;
