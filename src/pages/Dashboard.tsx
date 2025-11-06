import { useState } from "react";
import { FileText, CheckCircle, Clock, AlertCircle, MessageSquare, MessageCircle, Paperclip, X, CalendarIcon } from "lucide-react";
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
import { findNotificationByProposal } from "@/lib/notifications";
const recentPolicies = [{
  //InitiatedBy: "Ko Nyein Chan Lin",
  proposalNo: "POL-2024-001",
  registrationNo: "MH-01-AB-1234",
  AssignedTo: "Kyaw Soe Khine",
  workflowStatus: "Survey",
  duration: "2 days",
  requestDate: "2025-10-21"
}, {
  //InitiatedBy: "Ko Nyein Chan Lin",
  proposalNo: "POL-2024-002",
  registrationNo: "MH-02-CD-5678",
  AssignedTo: "Nyein Chan Lin",
  workflowStatus: "Approval",
  duration: "5 days",
  requestDate: "2025-10-18"
}, {
  //InitiatedBy: "Ko Nyein Chan Lin",
  proposalNo: "POL-2024-003",
  registrationNo: "MH-03-EF-9012",
  AssignedTo: "Min Thein Htay",
  workflowStatus: "Payment",
  duration: "3 days",
  requestDate: "2025-10-20"
}, {
  //InitiatedBy: "Ko Nyein Chan Lin",
  proposalNo: "POL-2024-004",
  registrationNo: "MH-04-GH-3456",
  AssignedTo: "Kyaw Soe Khine",
  workflowStatus: "Inform",
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
  // Removed commentDialog state
  const [messageDialog, setMessageDialog] = useState<{
    open: boolean;
    proposalNo: string | null;
  }>({
    open: false,
    proposalNo: null
  });
  const [message, setMessage] = useState("");
  // Removed comment and policyComments state
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
  // Removed handleCommentSubmit
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

  // Helper to set selected rows to a specific status
  const setSelectedToStatus = (status: "acknowledge" | "done" | "closed") => {
    if (selectedRows.length === 0) return;
    const newStatuses = { ...policyStatuses };
    selectedRows.forEach(p => {
      newStatuses[p] = status;
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
        <Card className={`hover-lift cursor-pointer transition-all ${activeStatus === "acknowledge" ? "border-warning ring-2 ring-warning/20" : "hover:border-primary/50"}`} onClick={() => setActiveStatus("acknowledge")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Acknowledge</p>
                <p className="text-3xl font-bold text-foreground">{getStatusCount("acknowledge")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`hover-lift cursor-pointer transition-all ${activeStatus === "done" ? "border-success ring-2 ring-success/20" : "hover:border-success/50"}`} onClick={() => setActiveStatus("done")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Pending

              </p>
                <p className="text-3xl font-bold text-foreground">{getStatusCount("done")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`hover-lift cursor-pointer transition-all ${activeStatus === "closed" ? "border-destructive ring-2 ring-destructive/20" : "hover:border-destructive/50"}`} onClick={() => setActiveStatus("closed")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-foreground">{getStatusCount("closed")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Policies Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {activeStatus === "acknowledge" ? "Acknowledge" : activeStatus === "done" ? "Pending" : "Completed"} Noti Record
          </CardTitle>
          <div className="flex gap-4 mt-4">
            
            
            {dateFilter !== "custom" ? <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anytime">Anytime</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="last7days">Last 7 days</SelectItem>
                  <SelectItem value="last30days">Last 30 days</SelectItem>
                  <SelectItem value="last6months">Last 6 months</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select> : <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[280px] justify-start text-left font-normal", !customDateRange?.from && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {customDateRange?.from ? customDateRange?.to ? <>
                          {format(customDateRange.from, "LLL dd, y")} -{" "}
                          {format(customDateRange.to, "LLL dd, y")}
                        </> : format(customDateRange.from, "LLL dd, y") : <span>Pick a date range</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="range" selected={customDateRange as any} onSelect={setCustomDateRange as any} numberOfMonths={2} className="pointer-events-auto" />
                  <div className="p-3 border-t flex gap-2">
                    <Button variant="outline" onClick={() => {
                  setDateFilter("anytime");
                  setCustomDateRange(undefined);
                }} className="flex-1">
                      Clear
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {activeStatus !== "closed" && (
                  <TableHead className="w-12">
                    <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                  </TableHead>
                )}
                <TableHead className="w-[200px]">Notification No</TableHead>
                <TableHead>Proposal No</TableHead>
                <TableHead>Registration No</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Workflow Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Request Date</TableHead>
                {/* Removed Comment column header */}
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPolicies.map(policy => <TableRow key={policy.proposalNo}>
                  {activeStatus !== "closed" && (
                    <TableCell className="w-12">
                      <Checkbox checked={selectedRows.includes(policy.proposalNo)} onCheckedChange={checked => handleRowSelect(policy.proposalNo, checked as boolean)} />
                    </TableCell>
                  )}
                  <TableCell className="w-[200px] font-medium">{findNotificationByProposal(policy.proposalNo)?.notificationNo ?? '20251106-123456'}</TableCell>
                  <TableCell>{policy.proposalNo}</TableCell>
                  <TableCell>{policy.registrationNo}</TableCell>
                  <TableCell>{policy.AssignedTo}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {policy.workflowStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{policy.duration}</TableCell>
                  <TableCell className="text-muted-foreground">{policy.requestDate}</TableCell>
                  {/* Removed Comment button cell */}
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
      
      <div className="flex justify-end gap-2">
        {/* Conditional action buttons based on activeStatus */}
        {activeStatus === "acknowledge" && (
          <>
            <Button variant="outline" disabled={selectedRows.length === 0} onClick={() => setSelectedToStatus("done")}>Pending ({selectedRows.length})</Button>
            <Button variant="ghost" disabled={selectedRows.length === 0} onClick={() => setSelectedToStatus("closed")}>Completed ({selectedRows.length})</Button>
          </>
        )}
        {activeStatus === "done" && (
          <>
            <Button variant="outline" disabled={selectedRows.length === 0} onClick={() => setSelectedToStatus("acknowledge")}>Acknowledge ({selectedRows.length})</Button>
            <Button variant="ghost" disabled={selectedRows.length === 0} onClick={() => setSelectedToStatus("closed")}>Completed ({selectedRows.length})</Button>
          </>
        )}
        {activeStatus === "closed" && (
          <>
            <Button variant="outline" disabled={selectedRows.length === 0} onClick={() => setSelectedToStatus("acknowledge")}>Acknowledge ({selectedRows.length})</Button>
            <Button variant="ghost" disabled={selectedRows.length === 0} onClick={() => setSelectedToStatus("done")}>Pending ({selectedRows.length})</Button>
          </>
        )}
      </div>
      
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
            
            
          </div>
          <DialogFooter>
            <Button onClick={handleMessageSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}