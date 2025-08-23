
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ShoppingCart, Grid, List } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Premium Coffee Beans",
    category: "Beverages",
    price: 24.99,
    unit: "kg",
    image: "/placeholder.svg",
    description: "High-quality arabica coffee beans",
    inStock: true,
    minOrder: 10
  },
  {
    id: 2,
    name: "Organic Tea Leaves",
    category: "Beverages", 
    price: 18.50,
    unit: "kg",
    image: "/placeholder.svg",
    description: "Premium organic tea leaves",
    inStock: true,
    minOrder: 5
  },
  {
    id: 3,
    name: "Artisan Chocolate",
    category: "Confectionery",
    price: 32.75,
    unit: "kg",
    image: "/placeholder.svg",
    description: "Handcrafted premium chocolate",
    inStock: false,
    minOrder: 2
  },
  {
    id: 4,
    name: "Organic Honey",
    category: "Natural Products",
    price: 45.00,
    unit: "kg",
    image: "/placeholder.svg",
    description: "Pure organic wildflower honey",
    inStock: true,
    minOrder: 3
  }
];

const categories = ["All", "Beverages", "Confectionery", "Natural Products"];

const ProductCatalog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Product Catalog</h1>
        <Button onClick={() => navigate("/cart")}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          View Cart
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredProducts.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className={viewMode === "list" ? "w-full" : ""}>
              <CardContent className={`p-4 ${viewMode === "list" ? "flex items-center space-x-4" : ""}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={viewMode === "list" ? "w-24 h-24 object-cover rounded-lg" : "w-full h-48 object-cover rounded-lg mb-4"}
                />
                <div className={viewMode === "list" ? "flex-1" : ""}>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={product.inStock ? "secondary" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                    <span className="text-sm text-gray-500">Min: {product.minOrder} {product.unit}</span>
                  </div>
                  <div className={`flex items-center justify-between ${viewMode === "list" ? "" : ""}`}>
                    <span className="text-xl font-bold">₹{product.price}/{product.unit}</span>
                    <Button 
                      onClick={() => navigate(`/product/${product.id}`)}
                      disabled={!product.inStock}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
