// components/customers/CustomerList.tsx
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../../components/ui/table";
import { MoreHorizontal, Mail, Phone } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
import { Badge } from "../../components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface Customer {
    id: string;
    name: string;
    email: string;
    phone?: string;
    status: 'active' | 'inactive' | 'pending';
    lastPurchase?: Date;
    total_spent: number;
    avatarUrl?: string;
}

interface CustomerListProps {
    customers: Customer[];
}

export function CustomerList({ customers }: CustomerListProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Purchase</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="w-10"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {customers.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            No customers found
                        </TableCell>
                    </TableRow>
                ) : (
                    customers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                                        <AvatarFallback>
                                            {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{customer.name}</div>
                                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={
                                    customer.status === 'active' ? 'default' :
                                        customer.status === 'inactive' ? 'secondary' : 'outline'
                                }>
                                    {customer.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {customer.lastPurchase ?
                                    formatDistanceToNow(customer.lastPurchase, { addSuffix: true }) :
                                    'Never'
                                }
                            </TableCell>
                            <TableCell className="text-right">
                                ${customer.total_spent}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>
                                            <Mail className="mr-2 h-4 w-4" />
                                            Email Customer
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Phone className="mr-2 h-4 w-4" />
                                            Call Customer
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>View Customer</DropdownMenuItem>
                                        <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}

export default CustomerList;