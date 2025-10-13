import { useState } from "react";
import { Search, Plus, Send, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
const mockProposals = [{
  id: "EFI-HO-CM-PO-00003102-10-2025",
  vehicleNo: "YGN 9F/9517",
  customerName: " Mao Hsin Co., Ltd",
  stage: "Survey",
  suminsured: "2,xxx,xxx",
  premium: "4x,xxx",
  department: "Motor-Underwriter",
  status: "pending"
}, {
  id: "EFI-HO-EV-PO-0000000041-10-2025",
  vehicleNo: "MDY 6L/7988",
  customerName: "Daw Yin Yin Htwe",
  stage: "Approval",
  suminsured: "3,xxx,xxx",
  premium: "5x,xxx",
  department: "Motor-Underwriter",
  status: "pending"
}, {
  id: "EFI-HO-CM-PO-00003101-10-2025",
  vehicleNo: "YGN 1S/7837",
  customerName: "VITASPRING BEVERAGES LTD.",
  stage: "Proposal",
  suminsured: "1,xxx,xxx",
  premium: "3x,xxx",
  department: "Motor-Underwriter",
  status: "pending"
}];

function MotorTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const navigate = useNavigate();
  const filteredProposals = mockProposals.filter(proposal => {
    const matchesSearch = proposal.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) || proposal.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStage === "all" || proposal.stage === filterStage;
    return matchesSearch && matchesFilter;
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchValue);
    setFilterStage(filterValue);
  };
  return <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <form className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" onSubmit={handleSubmit}>
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by vehicle number..." value={searchValue} onChange={e => setSearchValue(e.target.value)} className="pl-9" />
              </div>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by customer name..." value={searchValue} onChange={e => setSearchValue(e.target.value)} className="pl-9" />
              </div>
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Underwriting</SelectItem>
                  <SelectItem value="Proposal">Endorsement</SelectItem>
                  <SelectItem value="Survey">Terminate</SelectItem>
                  <SelectItem value="Approval">Renewal</SelectItem>
                  <SelectItem value="Approval">Claim</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="ml-2" variant="default">
                <Search className="h-4 w-4 mr-1" /> Search
              </Button>
            </div>
          </form>
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
                <TableHead>Suminsured</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Department</TableHead>
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
                  <TableCell>{proposal.suminsured}</TableCell>
                  <TableCell>{proposal.premium}</TableCell>
                  <TableCell>
                    {proposal.department}
                  </TableCell>
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

export default MotorTracking;
