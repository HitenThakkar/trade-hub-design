
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Package, 
  IndianRupee,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RetailerDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Orders",
      value: "24",
      change: "+3 this month",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Spent",
      value: "₹1,25,400",
      change: "+15% from last month",
      icon: IndianRupee,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Products Ordered",
      value: "156",
      change: "+8 new items",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Avg Order Value",
      value: "₹5,225",
      change: "+12% improvement",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const recentOrders = [
    { id: "ORD-R001", date: "2024-01-15", amount: "₹8,500", status: "Delivered", items: 12 },
    { id: "ORD-R002", date: "2024-01-18", amount: "₹5,200", status: "In Transit", items: 8 },
    { id: "ORD-R003", date: "2024-01-20", amount: "₹12,300", status: "Processing", items: 15 },
  ];

  const featuredProducts = [
    { id: 1, name: "Premium Rice 25kg", price: "₹1,250", category: "Grains", image: "/placeholder.svg" },
    { id: 2, name: "Wheat Flour 10kg", price: "₹480", category: "Flour", image: "/placeholder.svg" },
    { id: 3, name: "Basmati Rice 20kg", price: "₹2,100", category: "Rice", image: "/placeholder.svg" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Retailer Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your wholesale orders and explore products.</p>
        </div>
        <Button onClick={() => navigate("/catalog")} className="bg-green-600 hover:bg-green-700">
          <Package className="h-4 w-4 mr-2" />
          Browse Catalog
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest wholesale orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.date} • {order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <Badge 
                      variant={order.status === 'Processing' ? 'secondary' : 
                               order.status === 'In Transit' ? 'default' : 'outline'}
                      className={order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {order.status === 'Delivered' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {order.status === 'In Transit' && <Clock className="h-3 w-3 mr-1" />}
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => navigate("/order-history")}>
                View All Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Products */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Products</CardTitle>
            <CardDescription>Popular items in wholesale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {featuredProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                     onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.price}</p>
                    <p className="text-xs text-gray-500">per unit</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => navigate("/catalog")}>
                View All Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RetailerDashboard;
