import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { ScrollArea } from '../../components/ui/scroll-area';
import {
    Home,
    Users,
    CreditCard,
    Settings,
    BarChart2,
    HelpCircle,
    LogOut
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

export function Sidebar({ className }: SidebarProps) {
    const navItems = [
        {icon: Home, label: 'Dashboard', href: '/'},
        {icon: Users, label: 'Customers', href: '/customers'},
        {icon: CreditCard, label: 'Payments', href: '/payments'},
        {icon: BarChart2, label: 'Analytics', href: '/analytics'},
        {icon: Settings, label: 'Settings', href: '/settings'},
    ];

    return (
        <div className={cn("flex flex-col h-screen w-64 border-r bg-background sticky top-0", className)}>
            <div className="px-4 py-6">
                <div className="flex items-center mb-6">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="16" fill="hsl(var(--primary))"/>
                        <path d="M16 10.5V21.5M10.5 16H21.5" stroke="white" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                    <h1 className="ml-2 text-xl font-bold">Stripe Dashboard</h1>
                </div>

                <ScrollArea className="flex-1 sticky">
                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                className={({isActive}) =>
                                    cn(
                                        "flex items-center px-3 py-2 text-sm rounded-md",
                                        "transition-colors hover:bg-muted",
                                        isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
                                    )
                                }
                            >
                                <item.icon className="mr-2 h-4 w-4"/>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </ScrollArea>
            </div>

            <div className="mt-auto p-4 border-t">
                <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary"/>
                    <div className="ml-2">
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                </div>

                <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                        <HelpCircle className="mr-2 h-4 w-4"/>
                        Help & Support
                    </Button>
                    <Button variant="ghost" size="sm"
                            className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
                        <LogOut className="mr-2 h-4 w-4"/>
                        Log out
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;



