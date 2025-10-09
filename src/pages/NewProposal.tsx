import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function NewProposal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    licenseNo: "",
    vehicleNo: "",
    sumInsured: "",
    recipient: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Proposal created successfully!");
    navigate("/tracking");
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/tracking")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">New Motor Proposal</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proposal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  placeholder="Enter customer name"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseNo">License Number *</Label>
                <Input
                  id="licenseNo"
                  placeholder="Enter license number"
                  value={formData.licenseNo}
                  onChange={(e) =>
                    setFormData({ ...formData, licenseNo: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleNo">Vehicle Number *</Label>
                <Input
                  id="vehicleNo"
                  placeholder="KL-01-AB-1234"
                  value={formData.vehicleNo}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleNo: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sumInsured">Sum Insured (₹) *</Label>
                <Input
                  id="sumInsured"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.sumInsured}
                  onChange={(e) =>
                    setFormData({ ...formData, sumInsured: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Attach Documents</Label>
              <div className="flex items-center gap-4">
                <Input id="file" type="file" className="flex-1" />
                <Button type="button" variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient">Send To *</Label>
              <Select
                value={formData.recipient}
                onValueChange={(value) =>
                  setFormData({ ...formData, recipient: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="survey">Survey Team</SelectItem>
                  <SelectItem value="approval">Approval Department</SelectItem>
                  <SelectItem value="finance">Finance Team</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message..."
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Create & Send
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/tracking")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
