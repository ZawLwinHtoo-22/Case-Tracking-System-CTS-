import { useState } from "react";
import { FileText, CheckCircle, Clock, AlertCircle, MessageSquare, Paperclip, X, CalendarIcon } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
const recentPolicies = [{
  sender: "Ko Nyein Chan Lin",
  proposalNo: "EFI-HO/CM/PO/00001694/9-2025",
  registrationNo: "YGN BB/8102",
  insuredPerson: " Sweety Home Industry Co., Ltd",
  workflowStatus: "Acknowledged",
  duration: "2 days",
  requestDate: "2025-10-21"
}, {
  sender: "Ko Kyaw Soe Khaing",
  proposalNo: "EFI-HO/CM/PO/00000615/9-2023",
  registrationNo: "YGN 4D/8169",
  insuredPerson: "U Bo Bo Zaw Chit Hlaing",
  workflowStatus: "In Progress",
  duration: "5 days",
  requestDate: "2025-10-18"
}, {
  sender: "Ko Thiha Soe",
  proposalNo: "EFI-HO/EV/C-PO/0000000002/9-2025",
  registrationNo: "NPW 9S/9296",
  insuredPerson: "U Wai Phyo Zaw",
  workflowStatus: "In Progress",
  duration: "3 days",
  requestDate: "2025-10-21"
}, {
  sender: "Ko Zaw Lwin Htoo",
  proposalNo: "EFI-HO/CM/C-PO/00000182/9-2023",
  registrationNo: "BGO 5R/1709",
  insuredPerson: "U Min Si Thu",
  workflowStatus: "Completed",
  duration: "1 day",
  requestDate: "2025-10-21"
}];
const messages = [{
  id: 1,
  from: "Nyein Chan Lin",
  subject: "Survey completed for POL-2024-056",
  time: "10 mins ago",
  unread: true
}, {
  id: 2,
  from: "Kyaw Soe Khaing",
  subject: "Pending approval for motor policy",
  time: "2 hours ago",
  unread: true
}, {
  id: 3,
  from: "You",
  subject: "Payment confirmation required",
  time: "5 hours ago",
  unread: false
}];
export default function Dashboard() {
  const [activeStatus, setActiveStatus] = useState<"acknowledge" | "done" | "closed">("acknowledge");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [mailboxFilter, setMailboxFilter] = useState<"inbox" | "sent">("inbox");
  const [dateFilter, setDateFilter] = useState<string>("anytime");
  const [customDateRange, setCustomDateRange] = useState<{
    from?: Date;
    to?: Date;
  } | undefined>(undefined);
  
  const [messageDialog, setMessageDialog] = useState<{
    open: boolean;
    proposalNo: string | null;
  }>({
    open: false,
    proposalNo: null
  });

  const [message, setMessage] = useState("");
  // Removed comment-related state
  const [policyStatuses, setPolicyStatuses] = useState<Record<string, "acknowledge" | "done" | "closed">>({});
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredPolicies.map(policy => policy.proposalNo));
    } else {
      setSelectedRows([]);
    }
  };
  const handleRowSelect = (proposalNo: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, proposalNo]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== proposalNo));
    }
  };
  
  const handleDone = () => {
    if (selectedRows.length === 0) return;
    const newStatuses = {
      ...policyStatuses
    };
    const nextStatus = activeStatus === "acknowledge" ? "done" : "closed";
    selectedRows.forEach(proposalNo => {
      newStatuses[proposalNo] = nextStatus;
    });
    setPolicyStatuses(newStatuses);
    setSelectedRows([]);
  };
  const getStatusCount = (status: "acknowledge" | "done" | "closed") => {
    const statusPolicies = recentPolicies.filter(p => (policyStatuses[p.proposalNo] || "acknowledge") === status);
    return status === "acknowledge" ? 124 + statusPolicies.length : status === "done" ? 1089 + statusPolicies.length : 35 + statusPolicies.length;
  };
  const filteredPolicies = recentPolicies.filter(policy => (policyStatuses[policy.proposalNo] || "acknowledge") === activeStatus);
  const handleMessageSubmit = () => {
    // Handle message submission logic here
    setMessage("");
    setMessageDialog({
      open: false,
      proposalNo: null
    });
  };
  const isAllSelected = selectedRows.length === filteredPolicies.length && filteredPolicies.length > 0;
  return <div className="space-y-6 animate-in">
      {/* Status Navigation Menu */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* ...existing code for status cards... */}
      </div>

      {/* Recent Policies Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            To Do Tasks Record
            {/* {activeStatus === "acknowledge" ? "Acknowledge" : activeStatus === "done" ? "Done" : "Closed"} Policies */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {activeStatus !== "closed" && (
                  <TableHead className="w-12">
                    
                  </TableHead>
                )}
                <TableHead>{mailboxFilter === "sent" ? "To" : "Sender"}</TableHead>
                <TableHead>Proposal No</TableHead>
                <TableHead>Registration No</TableHead>
                <TableHead>Insured Person</TableHead>
                <TableHead>Tracking Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPolicies.map(policy => <TableRow key={policy.proposalNo}>
                  {activeStatus !== "closed" && (
                    <TableCell className="w-12">
                    </TableCell>
                  )}
                  <TableCell className="font-medium">{policy.sender}</TableCell>
                  <TableCell>{policy.proposalNo}</TableCell>
                  <TableCell>{policy.registrationNo}</TableCell>
                  <TableCell>{policy.insuredPerson}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {policy.workflowStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{policy.duration}</TableCell>
                  <TableCell className="text-muted-foreground">{policy.requestDate}</TableCell>

                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setMessageDialog({
                  open: true,
                  proposalNo: policy.proposalNo
                })}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Removed select box and Submit button as requested */}
      
      {/* Comment Dialog removed */}
      
      {/* Message Dialog */}
      <Dialog open={messageDialog.open} onOpenChange={open => setMessageDialog({
      open,
      proposalNo: null
    })}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Messages History */}
            <div className="space-y-3 border-b pb-4">
              <h4 className="text-sm font-medium text-muted-foreground">Message History</h4>
              {messages.map(msg => <div key={msg.id} className={`p-3 rounded-lg ${msg.unread ? 'bg-primary/5 border border-primary/20' : 'bg-muted'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{msg.from}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{msg.subject}</p>
                </div>)}
            </div>
            
            {/* New Message Form */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message here..." value={message} onChange={e => setMessage(e.target.value)} rows={5} />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="file-upload">Attach File</Label>
              <div className="flex items-center gap-2">
                <Input id="file-upload" type="file" className="flex-1" />
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-upload">Attach Image</Label>
              <div className="flex items-center gap-2">
                <Input id="image-upload" type="file" accept="image/*" className="flex-1" />
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
            </div> */}
          </div>
          <DialogFooter>
            <Button onClick={handleMessageSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}