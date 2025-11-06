import { useState, useEffect } from "react";
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
import { getCategories } from "@/lib/categories";
import { format } from "date-fns";
import { addNotification } from "@/lib/notifications";

const users = [
  { id: "kyaw", name: "Ko Kyaw Soe Khaing" },
  { id: "thiha", name: "Ko Thiha Soe" },
  { id: "nyein", name: "Ko Nyein Chan Lin" },
];

const roles = [
  { id: "survey", name: "Motor-Underwriter" },
  { id: "approval", name: "Head-Office-Admin" },
  { id: "finance", name: "Claim Underwriter" },
  { id: "sales", name: "Finance-Admin" },
];

const surveyTeamUsers = [
  { id: "DawNuNuSoe", name: "Daw Nu Nu Soe" },
  { id: "NandaSheinKyaw", name: "Nanda Shein Kyaw" },
];
const approvalTeamUsers = [
  { id: "UKyawKoKoOo", name: "U Kyaw Ko Ko Oo" },
  { id: "UNandaKyawKhant", name: "U Nanda Kyaw Khant" },
];
const financeTeamUsers = [
  { id: "UKaungKhantThaw", name: "U Kaung Khant Thaw" },
  { id: "UYeHtetOo", name: "U Ye Htet Oo" },
];
const salesTeamUsers = [
  { id: "DawThweZinMyo", name: "Daw Thwe Zin Myo" },
  { id: "DawOhnmarSwe", name: "Daw Ohnmar Swe" },
];



export default function Notification() {
  const navigate = useNavigate();
  const { proposalId } = useParams();
  const [recipientType] = useState<"roles">("roles");
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRecipients.length === 0) {
      toast.error("Please select at least one recipient");
      return;
    }
    // generate notification key using datetime format
    const now = new Date();
    // Format: YYYYMMDD-HHmmss (e.g., 20251106-143512)
    const key = format(now, "yyyyMMdd-HHmmss");
    const notification = {
      notificationNo: key,
      proposalNo: proposalId ?? null,
      sender: "You",
      category,
      description,
      createdAt: now.toISOString(),
    };
    addNotification(notification as any);
    toast.success("Notification sent successfully! Notification No: " + key);
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
                <span className="font-medium">Roles</span>
              </div>
              <div className="space-y-3 rounded-lg border border-border p-4">
                {roles.map((recipient) => (
                  <div key={recipient.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={recipient.id}
                      checked={selectedRecipients.includes(recipient.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          // Only allow one team (role) at a time
                          // Remove all other roles and their users
                          const allRoleIds = roles.map(r => r.id);
                          let newSelected = selectedRecipients.filter(id => !allRoleIds.includes(id));
                          // Remove all users from all teams
                          const allTeamUserIds = [
                            ...surveyTeamUsers.map(u => u.id),
                            ...approvalTeamUsers.map(u => u.id),
                            ...financeTeamUsers.map(u => u.id),
                            ...salesTeamUsers.map(u => u.id)
                          ];
                          newSelected = newSelected.filter(id => !allTeamUserIds.includes(id));
                          setSelectedRecipients([...newSelected, recipient.id]);
                        } else {
                          setSelectedRecipients(selectedRecipients.filter((id) => id !== recipient.id));
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
                {/* If Survey Team is selected, show its users */}
                {recipientType === "roles" && selectedRecipients.includes("survey") && (
                  <div className="pl-8 pt-2 pb-2 bg-muted rounded-md border-l-4 border-primary/40 mt-1">
                    <div className="mb-1 text-xs text-muted-foreground font-semibold">Survey Team Members</div>
                    <div className="space-y-2">
                      {surveyTeamUsers.map((user) => (
                        <div key={user.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={user.id}
                                checked={selectedRecipients.includes(user.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    // Allow multiple survey team members to be selected
                                    if (!selectedRecipients.includes(user.id)) {
                                      setSelectedRecipients([...selectedRecipients, user.id]);
                                    }
                                  } else {
                                    setSelectedRecipients(selectedRecipients.filter(id => id !== user.id));
                                  }
                                }}
                              />
                          <Label htmlFor={user.id} className="text-sm font-normal cursor-pointer">
                            {user.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {recipientType === "roles" && selectedRecipients.includes("approval") && (
                  <div className="pl-8 pt-2 pb-2 bg-muted rounded-md border-l-4 border-primary/40 mt-1">
                    <div className="mb-1 text-xs text-muted-foreground font-semibold">Approval Department Members</div>
                    <div className="space-y-2">
                      {approvalTeamUsers.map((user) => (
                        <div key={user.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={user.id}
                            checked={selectedRecipients.includes(user.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                // Allow multiple approval team members to be selected
                                if (!selectedRecipients.includes(user.id)) {
                                  setSelectedRecipients([...selectedRecipients, user.id]);
                                }
                              } else {
                                setSelectedRecipients(selectedRecipients.filter(id => id !== user.id));
                              }
                            }}
                          />
                          <Label htmlFor={user.id} className="text-sm font-normal cursor-pointer">
                            {user.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {recipientType === "roles" && selectedRecipients.includes("finance") && (
                  <div className="pl-8 pt-2 pb-2 bg-muted rounded-md border-l-4 border-primary/40 mt-1">
                    <div className="mb-1 text-xs text-muted-foreground font-semibold">Finance Team Members</div>
                    <div className="space-y-2">
                      {financeTeamUsers.map((user) => (
                        <div key={user.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={user.id}
                            checked={selectedRecipients.includes(user.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                // Allow multiple finance team members to be selected
                                if (!selectedRecipients.includes(user.id)) {
                                  setSelectedRecipients([...selectedRecipients, user.id]);
                                }
                              } else {
                                setSelectedRecipients(selectedRecipients.filter(id => id !== user.id));
                              }
                            }}
                          />
                          <Label htmlFor={user.id} className="text-sm font-normal cursor-pointer">
                            {user.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {recipientType === "roles" && selectedRecipients.includes("sales") && (
                  <div className="pl-8 pt-2 pb-2 bg-muted rounded-md border-l-4 border-primary/40 mt-1">
                    <div className="mb-1 text-xs text-muted-foreground font-semibold">Sales Team Members</div>
                    <div className="space-y-2">
                      {salesTeamUsers.map((user) => (
                        <div key={user.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={user.id}
                            checked={selectedRecipients.includes(user.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                // Allow multiple sales team members to be selected
                                if (!selectedRecipients.includes(user.id)) {
                                  setSelectedRecipients([...selectedRecipients, user.id]);
                                }
                              } else {
                                setSelectedRecipients(selectedRecipients.filter(id => id !== user.id));
                              }
                            }}
                          />
                          <Label htmlFor={user.id} className="text-sm font-normal cursor-pointer">
                            {user.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
