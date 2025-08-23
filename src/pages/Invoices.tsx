
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Plus } from "lucide-react";

const Invoices = () => {
  const invoices = [
    {
      id: "INV-001",
      customer: "Retail Plus Store",
      date: "2024-01-15",
      dueDate: "2024-02-14",
      amount: "₹25,400",
      status: "Paid",
      paymentDate: "2024-01-20"
    },
    {
      id: "INV-002",
      customer: "Metro Supermarket",
      date: "2024-01-14",
      dueDate: "2024-02-13",
      amount: "₹18,900",
      status: "Pending",
      paymentDate: null
    },
    {
      id: "INV-003",
      customer: "Quick Mart",
      date: "2024-01-12",
      dueDate: "2024-01-27",
      amount: "₹32,100",
      status: "Overdue",
      paymentDate: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600">Track payments and generate invoices</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Invoice Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {invoices.filter(i => i.status === "Paid").length}
              </div>
              <p className="text-sm text-gray-600">Paid Invoices</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {invoices.filter(i => i.status === "Pending").length}
              </div>
              <p className="text-sm text-gray-600">Pending Payment</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {invoices.filter(i => i.status === "Overdue").length}
              </div>
              <p className="text-sm text-gray-600">Overdue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Invoice ID</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Due Date</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-blue-600">{invoice.id}</td>
                    <td className="py-4 px-4">{invoice.customer}</td>
                    <td className="py-4 px-4 text-gray-600">{invoice.date}</td>
                    <td className="py-4 px-4 text-gray-600">{invoice.dueDate}</td>
                    <td className="py-4 px-4 font-medium">{invoice.amount}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;
