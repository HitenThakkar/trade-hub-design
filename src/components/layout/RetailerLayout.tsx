
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RetailerSidebar } from "./RetailerSidebar";
import { Button } from "@/components/ui/button";
import { LogOut, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RetailerLayoutProps {
  children: React.ReactNode;
}

export function RetailerLayout({ children }: RetailerLayoutProps) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <RetailerSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-white flex items-center px-4 lg:px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-auto flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate("/cart")}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{user?.name?.charAt(0) || 'R'}</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{user?.name || 'Retailer User'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'retailer@company.com'}</p>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
