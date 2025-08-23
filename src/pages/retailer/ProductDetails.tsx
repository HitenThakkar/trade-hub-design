
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mock product data
const mockProduct = {
  id: 1,
  name: "Premium Coffee Beans",
  category: "Beverages",
  price: 24.99,
  unit: "kg",
  image: "/placeholder.svg",
  description: "High-quality arabica coffee beans sourced from the best farms. Perfect for cafes and restaurants looking for premium quality.",
  longDescription: "These premium arabica coffee beans are carefully selected from high-altitude farms to ensure the best flavor profile. Each batch is roasted to perfection, delivering a rich and aromatic experience that your customers will love.",
  inStock: true,
  minOrder: 10,
  maxOrder: 1000,
  specifications: {
    "Origin": "Colombia",
    "Roast Level": "Medium",
    "Processing": "Washed",
    "Altitude": "1,200-1,800m",
    "Flavor Notes": "Chocolate, Caramel, Citrus"
  }
};

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(mockProduct.minOrder);

  const handleQuantityChange = (value: number) => {
    if (value >= mockProduct.minOrder && value <= mockProduct.maxOrder) {
      setQuantity(value);
    }
  };

  const totalPrice = quantity * mockProduct.price;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate("/catalog")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Catalog
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={mockProduct.image}
            alt={mockProduct.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{mockProduct.name}</h1>
            <Badge variant={mockProduct.inStock ? "secondary" : "destructive"} className="mb-4">
              {mockProduct.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
            <p className="text-gray-600 mb-4">{mockProduct.description}</p>
            <div className="text-3xl font-bold text-green-600">
              ₹{mockProduct.price} per {mockProduct.unit}
            </div>
          </div>

          {/* Order Form */}
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="quantity">Quantity ({mockProduct.unit})</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= mockProduct.minOrder}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || mockProduct.minOrder)}
                    className="w-24 text-center"
                    min={mockProduct.minOrder}
                    max={mockProduct.maxOrder}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= mockProduct.maxOrder}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Min: {mockProduct.minOrder} {mockProduct.unit}, Max: {mockProduct.maxOrder} {mockProduct.unit}
                </p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">Total Price:</span>
                  <span className="text-2xl font-bold">₹{totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full" disabled={!mockProduct.inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{mockProduct.longDescription}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              {Object.entries(mockProduct.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <dt className="font-medium">{key}:</dt>
                  <dd className="text-gray-600">{value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
