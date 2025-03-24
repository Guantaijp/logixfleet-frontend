// components/payments/PaymentFilters.tsx
import {
    Card,
    CardContent
} from"../../components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { CalendarIcon, FilterX } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../../components/ui/popover";
import {
    Calendar
} from "../../components/ui/calendar";
import {
    format
} from "date-fns";
import { useState } from "react";
import { DateRange as DayPickerDateRange } from "react-day-picker";

interface DateRange {
    from: Date | undefined;
    to?: Date | undefined;
}

interface PaymentFiltersProps {
    filters: {
        status: string;
        dateRange: DateRange | null;
        minAmount: string;
        maxAmount: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        status: string;
        dateRange: DateRange | null;
        minAmount: string;
        maxAmount: string;
    }>>;
}

export function PaymentFilters({ filters, setFilters }: PaymentFiltersProps) {
    const [date, setDate] = useState<DateRange | undefined>(
        filters.dateRange ? filters.dateRange : undefined
    );

    const handleStatusChange = (value: string) => {
        setFilters(prev => ({ ...prev, status: value }));
    };

    const handleDateChange = (range: DayPickerDateRange | undefined) => {
        setDate(range);
        if (range?.from) {
            setFilters(prev => ({ ...prev, dateRange: range as DateRange }));
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'minAmount' | 'maxAmount') => {
        setFilters(prev => ({ ...prev, [field]: e.target.value }));
    };

    const resetFilters = () => {
        setFilters({
            status: '',
            dateRange: null,
            minAmount: '',
            maxAmount: ''
        });
        setDate(undefined);
    };

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-40">
                        <label className="text-sm font-medium mb-1 block">Status</label>
                        <Select value={filters.status || undefined} onValueChange={handleStatusChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                                <SelectItem value="refunded">Refunded</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full md:w-40">
                        <label className="text-sm font-medium mb-1 block">Date Range</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date range</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={handleDateChange}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="w-full md:w-32">
                        <label className="text-sm font-medium mb-1 block">Min Amount</label>
                        <Input
                            type="number"
                            placeholder="Min $"
                            value={filters.minAmount}
                            onChange={(e) => handleAmountChange(e, 'minAmount')}
                        />
                    </div>

                    <div className="w-full md:w-32">
                        <label className="text-sm font-medium mb-1 block">Max Amount</label>
                        <Input
                            type="number"
                            placeholder="Max $"
                            value={filters.maxAmount}
                            onChange={(e) => handleAmountChange(e, 'maxAmount')}
                        />
                    </div>

                    <div className="w-full md:w-auto flex items-end">
                        <Button
                            variant="outline"
                            className="w-full md:w-auto"
                            onClick={resetFilters}
                        >
                            <FilterX className="mr-2 h-4 w-4" />
                            Reset
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default PaymentFilters;