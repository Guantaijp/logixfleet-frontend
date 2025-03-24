// pages/Customers.tsx
import { useState } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import { CustomerList } from '../components/customers/CustomerList.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.tsx';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';

export function Customers() {
    const { customers, isLoading } = useCustomers();
    const [searchQuery, setSearchQuery] = useState('');

// Ensure customers is always an array
    const customerList = Array.isArray(customers) ? customers : [];
    console.log(customerList);
    const filteredCustomers = customerList.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return <div className="flex items-center justify-center h-full">Loading customers...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                <p className="text-muted-foreground">Manage and view your customer accounts.</p>
            </div>

            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search customers by name or email..."
                    className="pl-8 w-full md:w-80"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <CustomerList customers={filteredCustomers} />
                </CardContent>
            </Card>
        </div>
    );
}

export default Customers;