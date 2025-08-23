
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Package
} from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      id: 1,
      name: "Premium Basmati Rice 25kg",
      category: "Grains",
      price: "₹2,450",
      stock: 150,
      status: "In Stock",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Wheat Flour 10kg",
      category: "Flour",
      price: "₹420",
      stock: 8,
      status: "Low Stock",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Refined Sugar 50kg",
      category: "Sugar",
      price: "₹2,100",
      stock: 3,
      status: "Critical",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Cooking Oil 15L",
      category: "Oil",
      price: "₹1,850",
      stock: 45,
      status: "In Stock",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Red Lentils 25kg",
      category: "Pulses",
      price: "₹1,650",
      stock: 32,
      status: "In Stock",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Black Pepper 1kg",
      category: "Spices",
      price: "₹650",
      stock: 0,
      status: "Out of Stock",
      image: "/placeholder.svg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      case "Out of Stock":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{product.price}</p>
                  <p className="text-sm text-gray-600">per unit</p>
                </div>
                <Badge className={getStatusColor(product.status)}>
                  {product.status}
                </Badge>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Stock Level</span>
                  <span className="font-medium">{product.stock} units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      product.stock > 50 ? 'bg-green-500' :
                      product.stock > 20 ? 'bg-yellow-500' :
                      product.stock > 0 ? 'bg-red-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${Math.min(100, (product.stock / 100) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{products.length}</div>
              <p className="text-sm text-gray-600">Total Products</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {products.filter(p => p.status === "Low Stock" || p.status === "Critical").length}
              </div>
              <p className="text-sm text-gray-600">Low Stock Items</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {products.filter(p => p.status === "Out of Stock").length}
              </div>
              <p className="text-sm text-gray-600">Out of Stock</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;
