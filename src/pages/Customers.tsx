
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Mail, Phone, MapPin } from "lucide-react";

const Customers = () => {
  const customers = [
    {
      id: 1,
      name: "Retail Plus Store",
      email: "contact@retailplus.com",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      orders: 24,
      totalSpent: "₹4,58,900",
      status: "Active",
      joinDate: "2023-06-15"
    },
    {
      id: 2,
      name: "Metro Supermarket",
      email: "orders@metrosuper.com",
      phone: "+91 87654 32109",
      location: "Delhi, NCR",
      orders: 18,
      totalSpent: "₹3,21,450",
      status: "Active",
      joinDate: "2023-08-22"
    },
    {
      id: 3,
      name: "Quick Mart",
      email: "info@quickmart.in",
      phone: "+91 76543 21098",
      location: "Bangalore, Karnataka",
      orders: 31,
      totalSpent: "₹6,75,200",
      status: "Premium",
      joinDate: "2023-04-10"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your retailer relationships</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{customers.length}</div>
                <p className="text-sm text-gray-600">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {customers.filter(c => c.status === "Active").length}
              </div>
              <p className="text-sm text-gray-600">Active Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {customers.filter(c => c.status === "Premium").length}
              </div>
              <p className="text-sm text-gray-600">Premium Customers</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {customers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{customer.name}</CardTitle>
                <Badge 
                  className={customer.status === "Premium" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}
                >
                  {customer.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{customer.location}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-xl font-bold text-gray-900">{customer.orders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-xl font-bold text-gray-900">{customer.totalSpent}</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Customers;
