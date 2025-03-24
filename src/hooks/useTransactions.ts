import { useState, useEffect } from 'react';

export interface Transaction {
    id: string;
    customer_id: string;
    customer: string;
    amount: number;
    status: 'succeeded' | 'failed' | 'pending';
    date: string;
    card_last4?: string; // Optional in case it's missing
    description?: string; // Optional in case it's missing
}

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const response = await fetch('/mock/transactions.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }
                const data = await response.json();

                // Extract transactions array if wrapped in an object
                const transactionsArray = Array.isArray(data) ? data : data.transactions;

                // Validate transactions array
                if (!Array.isArray(transactionsArray)) {
                    throw new Error("Invalid transactions data format");
                }

                // Ensure missing fields have defaults
                const formattedTransactions = transactionsArray.map(transaction => ({
                    ...transaction,
                    card_last4: transaction.card_last4 ?? '****',
                    description: transaction.description ?? 'No description',
                }));

                setTransactions(formattedTransactions);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setIsLoading(false);
            }
        }

        fetchTransactions();
    }, []);

    return { transactions, isLoading, error };
}
