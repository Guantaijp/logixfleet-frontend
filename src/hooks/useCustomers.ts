// hooks/useCustomers.ts
import { useState, useEffect } from 'react';

export interface Customer {
    id: string;
    name: string;
    email: string;
    created_at: string;
    total_spent: number;
    payment_method: {
        type: string;
        last4?: string;
        exp_month?: number;
        exp_year?: number;
    };
    status: 'active' | 'inactive';
}

export function useCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await fetch('/mock/customers.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }

                const data = await response.json();
                if (!data.customers || !Array.isArray(data.customers)) {
                    throw new Error('Invalid data format');
                }

                // Ensure missing fields are handled
                const formattedCustomers = data.customers.map((customer: { payment_method: any; status: any; }) => ({
                    ...customer,
                    payment_method: customer.payment_method ?? { type: "unknown" },
                    status: customer.status ?? "inactive",
                }));

                setCustomers(formattedCustomers);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setIsLoading(false);
            }
        }

        fetchCustomers();
    }, []);

    return { customers, isLoading, error };
}