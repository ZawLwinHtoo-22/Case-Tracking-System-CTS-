import { useState } from "react";
import { FolderTree } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function OrganizationSetup() {
  const [organizations, setOrganizations] = useState<Array<{id: string; name: string; type:  string; code: string; address: string; status: 'active' | 'inactive'; }>>([
    { id: "org-1", name: "EFI Insurance", type: "Insurance", code: "EFI", address: "No.1 Insure St, Yangon", status: 'active' },
    { id: "org-2", name: "EFD Bank", type: "Bank", code: "EFD", address: "10 Bank Rd, Mandalay", status: 'active' }
  ]);

  // Inline inputs
  const [name, setName] = useState("");
  const [type, setType] = useState("Insurance");
  const [address, setAddress] = useState("");

  const addOrg = () => {
    if (!name.trim()) return;
    const code = name.split(/\s+/).map(s => s[0]).join('').toUpperCase().slice(0,4) || `ORG${Date.now()}`;
    const id = `org-${Date.now()}`;
  setOrganizations(prev => [...prev, { id, name: name.trim(), type, code, address: address.trim(), status: 'active' }]);
    setName("");
    setType("Insurance");
    setAddress("");
  };

  const deleteOrg = (id: string) => {
    setOrganizations(prev => prev.filter(o => o.id !== id));
  };

  return (
    <div className="space-y-6 animate-in">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Organizations</CardTitle>
            {/* <CardDescription>Manage companies, departments and basic configuration</CardDescription> */}
          </div>
        </CardHeader>
        <CardContent>
          {/* Vertical add form with bold labels */}
          <div className="mb-4 space-y-3">
            <div>
              <Label className="font-bold">Name :</Label>
              <Input aria-label="Organization name" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            </div>
            <div>
              <Label className="font-bold">Organization Type :</Label>
              <Select value={type} onValueChange={v => setType(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Insurance">Insurance</SelectItem>
                  <SelectItem value="Bank">Bank</SelectItem>
                  <SelectItem value="Broker">Broker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-bold">Address :</Label>
              <Input aria-label="Organization address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address --" />
            </div>
            <div>
              <Button onClick={addOrg}>Add</Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map(org => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell>{org.type}</TableCell>
                  <TableCell className="text-muted-foreground">{org.address}</TableCell>
                  <TableCell>{org.status === 'active' ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive" onClick={() => deleteOrg(org.id)}>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
