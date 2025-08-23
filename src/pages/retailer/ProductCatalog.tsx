
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Package, ShoppingCart, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductCatalog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "grains", label: "Grains & Cereals" },
    { value: "flour", label: "Flour & Atta" },
    { value: "rice", label: "Rice Products" },
    { value: "pulses", label: "Pulses & Lentils" },
    { value: "spices", label: "Spices" },
    { value: "oil", label: "Cooking Oil" },
  ];

  const products = [
    { id: 1, name: "Premium Basmati Rice", category: "rice", price: 2100, unit: "25kg", minOrder: 5, inStock: true, rating: 4.8, image: "/placeholder.svg" },
    { id: 2, name: "Wheat Flour Grade A", category: "flour", price: 480, unit: "10kg", minOrder: 10, inStock: true, rating: 4.6, image: "/placeholder.svg" },
    { id: 3, name: "Toor Dal Premium", category: "pulses", price: 1250, unit: "20kg", minOrder: 3, inStock: false, rating: 4.7, image: "/placeholder.svg" },
    { id: 4, name: "Sunflower Oil", category: "oil", price: 850, unit: "5L", minOrder: 6, inStock: true, rating: 4.5, image: "/placeholder.svg" },
    { id: 5, name: "Red Chili Powder", category: "spices", price: 320, unit: "1kg", minOrder: 20, inStock: true, rating: 4.9, image: "/placeholder.svg" },
    { id: 6, name: "Sona Masoori Rice", category: "rice", price: 1800, unit: "25kg", minOrder: 4, inStock: true, rating: 4.4, image: "/placeholder.svg" },
    { id: 7, name: "Chickpea Flour", category: "flour", price: 650, unit: "10kg", minOrder: 8, inStock: true, rating: 4.3, image: "/placeholder.svg" },
    { id: 8, name: "Cumin Seeds", category: "spices", price: 1200, unit: "5kg", minOrder: 2, inStock: true, rating: 4.8, image: "/placeholder.svg" },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
        <p className="text-gray-600">Browse our wholesale product collection</p>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="p-4">
              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {categories.find(c => c.value === product.category)?.label}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">per {product.unit}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Min Order: {product.minOrder} units
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant={product.inStock ? "default" : "secondary"} className={product.inStock ? "bg-green-100 text-green-800" : ""}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!product.inStock}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductCatalog;
