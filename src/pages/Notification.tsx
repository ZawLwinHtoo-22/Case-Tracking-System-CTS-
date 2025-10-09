import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const users = [
  { id: "kyaw", name: "Ko Kyaw Soe Khaing" },
  { id: "thiha", name: "Ko Thiha Soe" },
  { id: "nyein", name: "Ko Nyein Chan Lin" },
];

const roles = [
  { id: "survey", name: "Survey Team" },
  { id: "approval", name: "Approval Department" },
  { id: "finance", name: "Finance Team" },
  { id: "sales", name: "Sales Team" },
];

const categories = [
  "Urgent Follow-up",
  "Document Required",
  "Approval Pending",
  "Survey Scheduled",
  "Payment Required",
];

export default function Notification() {
  const navigate = useNavigate();
  const { proposalId } = useParams();
  const [recipientType, setRecipientType] = useState<"users" | "roles">("users");
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRecipients.length === 0) {
      toast.error("Please select at least one recipient");
      return;
    }
    toast.success("Notification sent successfully!");
    navigate("/tracking");
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/tracking")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Send Notification</h2>
          <p className="text-sm text-muted-foreground">Proposal No: {proposalId}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Label>Recipients *</Label>
                <Select value={recipientType} onValueChange={(value) => {
                  setRecipientType(value as "users" | "roles");
                  setSelectedRecipients([]);
                }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="users">Users</SelectItem>
                    <SelectItem value="roles">Roles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3 rounded-lg border border-border p-4">
                {(recipientType === "users" ? users : roles).map((recipient) => (
                  <div key={recipient.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={recipient.id}
                      checked={selectedRecipients.includes(recipient.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRecipients([...selectedRecipients, recipient.id]);
                        } else {
                          setSelectedRecipients(
                            selectedRecipients.filter((id) => id !== recipient.id)
                          );
                        }
                      }}
                    />
                    <Label
                      htmlFor={recipient.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {recipient.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select notification category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Enter notification description..."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1 gap-2">
                <Send className="h-4 w-4" />
                Send Notification
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
