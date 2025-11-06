import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/layout/DashboardLayout";

// Retailer Portal Pages
import RetailerDashboard from "./pages/retailer/RetailerDashboard";
import ProductCatalog from "./pages/retailer/ProductCatalog";
import ProductDetails from "./pages/retailer/ProductDetails";
import ShoppingCart from "./pages/retailer/ShoppingCart";
import Checkout from "./pages/retailer/Checkout";
import OrderHistory from "./pages/retailer/OrderHistory";
import RetailerInvoices from "./pages/retailer/RetailerInvoices";
import { RetailerLayout } from "./components/layout/RetailerLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Portal Routes */}
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/products" element={<DashboardLayout><Products /></DashboardLayout>} />
          <Route path="/orders" element={<DashboardLayout><Orders /></DashboardLayout>} />
          <Route path="/customers" element={<DashboardLayout><Customers /></DashboardLayout>} />
          <Route path="/invoices" element={<DashboardLayout><Invoices /></DashboardLayout>} />
          <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          
          {/* Retailer Portal Routes */}
          <Route path="/retailerDashboard" element={<RetailerLayout><RetailerDashboard /></RetailerLayout>} />
          <Route path="/catalog" element={<RetailerLayout><ProductCatalog /></RetailerLayout>} />
          <Route path="/product/:id" element={<RetailerLayout><ProductDetails /></RetailerLayout>} />
          <Route path="/cart" element={<RetailerLayout><ShoppingCart /></RetailerLayout>} />
          <Route path="/checkout" element={<RetailerLayout><Checkout /></RetailerLayout>} />
          <Route path="/order-history" element={<RetailerLayout><OrderHistory /></RetailerLayout>} />
          <Route path="/retailer-invoices" element={<RetailerLayout><RetailerInvoices /></RetailerLayout>} />
          
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
