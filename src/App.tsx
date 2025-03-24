import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Customers } from './pages/Customers';
import { Payments } from './pages/Payments';

import { Toaster } from './components/ui/sonner';

export default function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="stripe-dashboard-theme">
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/payments" element={<Payments />} />
                    </Routes>
                </Layout>
                <Toaster />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export { App };