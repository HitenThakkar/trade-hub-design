
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, ShoppingCart, Star, Truck, Shield, RefreshCw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Static product data - in real app this would come from API
  const product = {
    id: parseInt(id || "1"),
    name: "Premium Basmati Rice",
    category: "Rice Products",
    price: 2100,
    unit: "25kg",
    minOrder: 5,
    maxOrder: 100,
    inStock: true,
    stockCount: 250,
    rating: 4.8,
    reviewCount: 124,
    description: "Premium quality basmati rice sourced directly from the finest farms. Long grain, aromatic, and perfect for retail distribution. Aged for optimal taste and texture.",
    specifications: {
      "Grade": "Grade A Premium",
      "Origin": "Punjab, India",
      "Aging": "12 months",
      "Moisture": "12% max",
      "Broken Grains": "2% max",
      "Purity": "99.5%"
    },
    features: [
      "Premium long grain basmati",
      "Naturally aged for better aroma",
      "Minimal broken grains",
      "Food safety certified",
      "Vacuum packed for freshness"
    ]
  };

  const handleAddToCart = () => {
    // In real app, this would add to cart state/context
    console.log(`Added ${quantity} units of ${product.name} to cart`);
    navigate("/cart");
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/catalog")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Catalog
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <Card>
          <CardContent className="p-6">
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Package className="h-24 w-24 text-gray-400" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full h-16 bg-gray-50 rounded border flex items-center justify-center">
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">{product.category}</Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviewCount} reviews)</span>
              </div>
              <Badge variant={product.inStock ? "default" : "secondary"} className={product.inStock ? "bg-green-100 text-green-800" : ""}>
                {product.inStock ? `${product.stockCount} In Stock` : "Out of Stock"}
              </Badge>
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
          </div>

          {/* Pricing */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-baseline space-x-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                <span className="text-lg text-gray-500">per {product.unit}</span>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Minimum order: {product.minOrder} units • Maximum order: {product.maxOrder} units
              </div>

              {/* Quantity Selection */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quantity">Quantity (units)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min={product.minOrder}
                    max={product.maxOrder}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || product.minOrder)}
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-between items-center text-lg font-medium">
                  <span>Total Amount:</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || quantity < product.minOrder}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Free delivery on orders above ₹10,000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Quality guaranteed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Easy returns within 7 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b last:border-b-0">
                  <span className="font-medium text-gray-600">{key}:</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
