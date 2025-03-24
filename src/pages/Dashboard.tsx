// pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { Stats } from '../components/dashboard/Stats';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { RevenueTrend } from '../components/dashboard/RevenueTrend';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useTransactions } from '../hooks/useTransactions';
import { useCustomers } from '../hooks/useCustomers';

export function Dashboard() {
    const { transactions, isLoading: isLoadingTransactions } = useTransactions();
    const { customers, isLoading: isLoadingCustomers } = useCustomers();
    const [stats, setStats] = useState({
        totalRevenue: 0,
        newCustomers: 0,
        successRate: 0,
        avgTransactionValue: 0
    });

    useEffect(() => {
        if (transactions.length) {
            // Calculate dashboard stats
            const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
            const successfulTransactions = transactions.filter(t => t.status === 'succeeded');
            const successRate = (successfulTransactions.length / transactions.length) * 100;
            const avgValue = totalRevenue / transactions.length;

            // Count new customers (last 30 days)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const newCustomers = customers.filter(c =>
                new Date(c.created_at) > thirtyDaysAgo
            ).length;

            setStats({
                totalRevenue,
                newCustomers,
                successRate,
                avgTransactionValue: avgValue
            });
        }
    }, [transactions, customers]);

    if (isLoadingTransactions || isLoadingCustomers) {
        return <div className="flex items-center justify-center h-full">Loading dashboard data...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your account activity and metrics.</p>
            </div>

            <Stats
                totalRevenue={stats.totalRevenue}
                newCustomers={stats.newCustomers}
                successRate={stats.successRate}
                avgTransactionValue={stats.avgTransactionValue}
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="md:col-span-2 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Revenue Trend</CardTitle>
                        <CardDescription>Daily revenue for the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RevenueTrend transactions={transactions} />
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>Latest payment activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentTransactions transactions={transactions.slice(0, 5)} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Dashboard;