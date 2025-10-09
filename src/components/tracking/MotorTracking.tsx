import { useState } from "react";
import { Search, Plus, Send, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
const mockProposals = [{
  id: "MOT-001",
  vehicleNo: "KL-01-AB-1234",
  customerName: "Rajesh Kumar",
  stage: "Survey",
  daysStuck: 3,
  suminsured: "2,500,000",
  premium: "45,000",
  status: "pending"
}, {
  id: "MOT-002",
  vehicleNo: "KL-02-CD-5678",
  customerName: "Priya Sharma",
  stage: "Approval",
  daysStuck: 5,
  suminsured: "3,200,000",
  premium: "58,000",
  status: "pending"
}, {
  id: "MOT-003",
  vehicleNo: "KL-03-EF-9012",
  customerName: "Anil Verma",
  stage: "Proposal",
  daysStuck: 2,
  suminsured: "1,800,000",
  premium: "32,000",
  status: "pending"
}];
export default function MotorTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("all");
  const navigate = useNavigate();
  const filteredProposals = mockProposals.filter(proposal => {
    const matchesSearch = proposal.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) || proposal.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStage === "all" || proposal.stage === filterStage;
    return matchesSearch && matchesFilter;
  });
  return <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by vehicle number or customer name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9" />
              </div>
              <Select value={filterStage} onValueChange={setFilterStage}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="Proposal">Proposal</SelectItem>
                  <SelectItem value="Survey">Survey</SelectItem>
                  <SelectItem value="Approval">Approval</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proposals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stuck Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proposal No
              </TableHead>
                <TableHead>Vehicle No</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Days Stuck</TableHead>
                <TableHead>Suminsured</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProposals.map(proposal => <TableRow key={proposal.id}>
                  <TableCell className="font-medium">{proposal.id}</TableCell>
                  <TableCell>{proposal.vehicleNo}</TableCell>
                  <TableCell>{proposal.customerName}</TableCell>
                  <TableCell>
                    <Badge variant={proposal.stage === "Proposal" ? "default" : proposal.stage === "Survey" ? "secondary" : "outline"}>
                      {proposal.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={proposal.daysStuck > 4 ? "text-destructive font-medium" : ""}>
                      {proposal.daysStuck} days
                    </span>
                  </TableCell>
                  <TableCell>{proposal.suminsured}</TableCell>
                  <TableCell>{proposal.premium}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/tracking/motor/notify/${proposal.id}`)} className="gap-2">
                      <Send className="h-3 w-3" />
                      Notify
                    </Button>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
}