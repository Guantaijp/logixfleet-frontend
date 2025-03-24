// Header.tsx
import React from 'react';
import { cn } from '../../lib/utils';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    onMenuClick: () => void;
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export function Header({ className, onMenuClick,theme, setTheme , ...props }: HeaderProps) {
    return (
        <header
            className={cn(
                "sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                className
            )}
            {...props}
        >
            <div className="flex h-16 items-center px-4 md:px-6">
                <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2 md:hidden"
                    onClick={onMenuClick}
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>

                <div className="ml-auto flex items-center space-x-4">
                    <div className="relative hidden md:flex">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-64 pl-8 rounded-lg bg-muted/50"
                        />
                    </div>

                    <Button variant="outline" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                        <span className="sr-only">Notifications</span>
                    </Button>

                    <Button variant="default">
                        + New Payment
                    </Button>
                </div>
                {/*<div className="flex items-center gap-2">*/}
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
                        className="p-2 border rounded-full mx-2 bg-background text-foreground"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                    </select>
                {/*</div>*/}
            </div>
        </header>
    );
}

export default Header;