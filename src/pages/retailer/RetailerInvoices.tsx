
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, Filter, FileText, Calendar } from "lucide-react";
import { useState } from "react";

// Mock invoice data
const mockInvoices = [
  {
    id: "INV-2024-001",
    orderId: "ORD-001",
    date: "2024-01-16",
    dueDate: "2024-02-15",
    status: "Paid",
    amount: 1687.50,
    tax: 135.00,
    total: 1822.50
  },
  {
    id: "INV-2024-002",
    orderId: "ORD-002", 
    date: "2024-01-21",
    dueDate: "2024-02-20",
    status: "Pending",
    amount: 892.25,
    tax: 71.38,
    total: 963.63
  },
  {
    id: "INV-2024-003",
    orderId: "ORD-003",
    date: "2024-01-23",
    dueDate: "2024-02-22",
    status: "Overdue",
    amount: 2340.75,
    tax: 187.26,
    total: 2528.01
  },
  {
    id: "INV-2024-004",
    orderId: "ORD-004",
    date: "2024-01-26",
    dueDate: "2024-02-25",
    status: "Draft",
    amount: 445.00,
    tax: 35.60,
    total: 480.60
  }
];

const RetailerInvoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalOutstanding = mockInvoices
    .filter(inv => inv.status === "Pending" || inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export All
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{totalOutstanding.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockInvoices.reduce((sum, inv) => sum + inv.total, 0).toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInvoices.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by invoice ID or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <div className="space-y-4">
        {filteredInvoices.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <FileText className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No invoices found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        ) : (
          filteredInvoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <h3 className="font-semibold text-lg">{invoice.id}</h3>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Invoice Date: {new Date(invoice.date).toLocaleDateString()}
                      </p>
                      <p>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                      <p>Order: {invoice.orderId}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end space-y-2">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Amount: ₹{invoice.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Tax: ₹{invoice.tax.toFixed(2)}</p>
                      <p className="text-xl font-semibold">Total: ₹{invoice.total.toFixed(2)}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
                
                {invoice.status === "Overdue" && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-800">
                      This invoice is overdue. Please make payment to avoid any service interruptions.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RetailerInvoices;
