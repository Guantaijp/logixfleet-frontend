// components/dashboard/RevenueTrend.tsx
import { useMemo } from 'react';
import { Transaction } from '@/hooks/useTransactions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueTrendProps {
    transactions: Transaction[];
}

// Define formatters directly in this file to avoid import issues
const formatters = {
    formatCurrency: (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    },

    formatCurrencyCompact: (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(amount);
    },

    formatShortDate: (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric'
        }).format(date);
    }
};

export function RevenueTrend({ transactions }: RevenueTrendProps) {
    const chartData = useMemo(() => {
        if (!Array.isArray(transactions) || transactions.length === 0) {
            console.error("Expected a non-empty array but got:", transactions);
            return [];
        }

        // Get the last 30 days
        const dates: { [key: string]: number } = {};
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Set to end of day

        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            // Use YYYY-MM-DD format consistently
            const dateString = date.toISOString().split('T')[0];
            dates[dateString] = 0;
        }

        // Calculate date range boundaries for filtering
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        thirtyDaysAgo.setHours(0, 0, 0, 0); // Start of day

        // Filter transactions to ensure they are within the last 30 days
        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= thirtyDaysAgo && transactionDate <= today;
        });

        console.log("Filtered Transactions Count:", filteredTransactions.length);

        // Process each transaction
        filteredTransactions.forEach(transaction => {
            // Ensure transaction amount is a number
            const amount = typeof transaction.amount === 'number'
                ? transaction.amount
                : parseFloat(String(transaction.amount));

            if (isNaN(amount)) {
                console.warn("Invalid transaction amount:", transaction.amount);
                return; // Skip this transaction
            }

            // Convert transaction date to YYYY-MM-DD format
            const transactionDate = new Date(transaction.date);
            const dateKey = transactionDate.toISOString().split('T')[0];

            // Add to the corresponding date's total
            if (dates[dateKey] !== undefined) {
                dates[dateKey] += amount;
            } else {
                console.warn("Date not in range:", dateKey);
            }
        });

        // Convert to array for chart and sort by date
        const result = Object.entries(dates)
            .map(([date, amount]) => ({
                date: date,
                displayDate: formatters.formatShortDate(date),
                amount: amount
            }))
            .sort((a, b) => a.date.localeCompare(b.date));

        console.log("Final Chart Data:", result);
        return result;
    }, [transactions]);

    // If no data or all zero values, show placeholder message
    const hasData = chartData.length > 0 && chartData.some(item => item.amount > 0);

    if (!hasData) {
        return (
            <div className="h-72 flex items-center justify-center text-gray-500">
                No revenue data available for the last 30 days.
            </div>
        );
    }

    return (
        <div className="h-72 w-full" style={{minHeight: "300px"}}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="displayDate"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12 }}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        tickFormatter={(value) => formatters.formatCurrencyCompact(value)}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12 }}
                        width={80}
                        domain={['auto', 'auto']}
                    />
                    <Tooltip
                        formatter={(value) => [formatters.formatCurrency(value as number), 'Revenue']}
                        labelFormatter={(label) => `Date: ${label}`}
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
                    />
                    <Line
                        name="Revenue"
                        type="linear"
                        dataKey="amount"
                        stroke="gray" // Use theme primary color
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 6 }}
                        isAnimationActive={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RevenueTrend;