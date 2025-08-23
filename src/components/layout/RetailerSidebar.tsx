
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  History, 
  FileText, 
  Store
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/retailerDashboard", icon: LayoutDashboard },
  { title: "Product Catalog", url: "/catalog", icon: Package },
  { title: "Shopping Cart", url: "/cart", icon: ShoppingCart },
  { title: "Order History", url: "/order-history", icon: History },
  { title: "Invoices", url: "/retailer-invoices", icon: FileText },
];

export function RetailerSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-white border-r">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-green-600" />
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">Retailer Portal</h1>
                <p className="text-xs text-gray-500">Wholesale Shopping</p>
              </div>
            )}
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-green-50 text-green-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
