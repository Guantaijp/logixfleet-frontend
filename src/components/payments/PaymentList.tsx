import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from"../../components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { MoreHorizontal, Eye, Download, RotateCcw } from "lucide-react";
import { format } from "date-fns";

interface Transaction {
    id: string;
    date: Date;
    amount: number;
    status: 'completed' | 'pending' | 'failed' | 'refunded' | "succeeded";
    customer: string;
    reference?: string;
}

interface PaymentListProps {
    transactions: Transaction[];
}

export function PaymentList({ transactions }: PaymentListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Pagination logic
    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTransactions = transactions.slice(startIndex, endIndex);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'success';
            case 'pending': return 'warning';
            case 'failed': return 'destructive';
            case 'refunded': return 'secondary';
            default: return 'default';
        }
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="w-10"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedTransactions.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                                No transactions found
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="whitespace-nowrap">
                                    {format(transaction.date, "MMM dd, yyyy")}
                                </TableCell>
                                <TableCell>{transaction.customer}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusColor(transaction.status) as any}>
                                        {transaction.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    ${transaction.amount.toFixed(2)}
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
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Receipt
                                            </DropdownMenuItem>
                                            {transaction.status === 'completed' && (
                                                <DropdownMenuItem>
                                                    <RotateCcw className="mr-2 h-4 w-4" />
                                                    Process Refund
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span className="text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

export default PaymentList;
