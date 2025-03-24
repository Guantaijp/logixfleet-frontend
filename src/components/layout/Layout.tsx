// Layout.tsx
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Sheet, SheetContent } from '../../components/ui/sheet';
import { useTheme } from '../../context/ThemeContext';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex min-h-screen bg-background">
            {/* Desktop sidebar */}
            <Sidebar className="hidden md:flex" />

            {/* Mobile sidebar */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetContent side="left" className="p-0 w-64">
                    <Sidebar />
                </SheetContent>
            </Sheet>

            <div className="flex flex-col flex-1">
                <Header
                    onMenuClick={() => setMobileOpen(true)}
                    theme={theme}
                    setTheme={setTheme}
                />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}

export default Layout;