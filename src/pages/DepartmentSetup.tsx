import { useState } from "react";
import { Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function DepartmentSetup() {
  // Mock organizations for selection (replace with API later)
  const mockOrgs = [
    { id: 'org-1', name: 'EFI Insurance' },
    { id: 'org-2', name: 'EFD Bank' }
  ];

  const [departments, setDepartments] = useState<Array<{id:string; name:string; organization_id:string; code:string; description:string; status:'active'|'inactive'}>>([
    { id: 'dept-1', name: 'Motor Sales', organization_id: 'org-1', code: 'MS', description: 'Motor sales division', status: 'active' }
  ]);

  const [name, setName] = useState('');
  const [organizationId, setOrganizationId] = useState(mockOrgs[0].id);
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'active'|'inactive'>('active');

  const addDepartment = () => {
    if (!name.trim()) return;
    const id = `dept-${Date.now()}`;
    setDepartments(prev => [...prev, { id, name: name.trim(), organization_id: organizationId, code: code.trim() || name.split(/\s+/).map(s=>s[0]).join('').toUpperCase().slice(0,4), description: description.trim(), status }]);
    setName(''); setCode(''); setDescription(''); setStatus('active');
  };

  const deleteDepartment = (id: string) => setDepartments(prev => prev.filter(d => d.id !== id));

  return (
    <div className="space-y-6 animate-in">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Departments</CardTitle>
            <CardDescription>Manage departments inside organizations</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <Label className="font-bold">Name :</Label>
              <Input value={name} onChange={e=>setName(e.target.value)} placeholder="Department name" />
            </div>
            <div>
              <Label className="font-bold">Organization :</Label>
              <Select value={organizationId} onValueChange={v=>setOrganizationId(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockOrgs.map(o=> <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-bold">Code :</Label>
              <Input value={code} onChange={e=>setCode(e.target.value)} placeholder="Dept code" />
            </div>
            <div>
              <Label className="font-bold">Description :</Label>
              <Textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Optional description" />
            </div>
            <div>
              <Label className="font-bold">Status :</Label>
              <Select value={status} onValueChange={v=>setStatus(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button onClick={addDepartment}>Add Department</Button>
            </div>
          </div>

          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map(d => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell>{mockOrgs.find(o=>o.id===d.organization_id)?.name || d.organization_id}</TableCell>
                    <TableCell>{d.code}</TableCell>
                    <TableCell className="text-muted-foreground">{d.description}</TableCell>
                    <TableCell>{d.status}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive" onClick={()=>deleteDepartment(d.id)}>Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
