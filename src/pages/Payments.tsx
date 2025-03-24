// pages/Payments.tsx
import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { PaymentList } from '../components/payments/PaymentList';
import { PaymentFilters } from '../components/payments/PaymentFilters';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.tsx';
import {DateRange} from "react-day-picker";

export function Payments() {
    const { transactions, isLoading } = useTransactions();
    const [filters, setFilters] = useState<{
        status: string;
        dateRange: DateRange | null;
        minAmount: string;
        maxAmount: string;
    }>({
        status: "",
        dateRange: null, // ✅ Correctly typed
        minAmount: "",
        maxAmount: "",
    });

    // Apply filters
    const filteredTransactions = (transactions ?? [])
        .map(transaction => ({ ...transaction, date: new Date(transaction.date) })) // Ensure date is converted
        .filter(transaction => {
            if (filters.status && transaction.status !== filters.status) return false;
            if (filters.minAmount && transaction.amount < parseFloat(filters.minAmount)) return false;
            if (filters.maxAmount && transaction.amount > parseFloat(filters.maxAmount)) return false;
            return true;
        });
    if (isLoading) {
        return <div className="flex items-center justify-center h-full">Loading payments...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
                <p className="text-muted-foreground">View and manage your payment transactions.</p>
            </div>

            <PaymentFilters filters={filters} setFilters={setFilters} />

            <Card>
                <CardHeader>
                    <CardTitle>All Payments ({filteredTransactions.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <PaymentList transactions={filteredTransactions} />
                </CardContent>
            </Card>
        </div>
    );
}

export default Payments;