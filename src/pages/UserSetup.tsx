import { useState } from "react";
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function UserSetup(){
  const mockOrgs = [ { id: 'org-1', name: 'EFI Insurance' }, { id: 'org-2', name: 'EFD Bank' } ];
  const mockDepts = [ { id: 'dept-1', name: 'Motor Sales', organization_id: 'org-1' }, { id: 'dept-2', name: 'Operations', organization_id: 'org-2' } ];
  const mockRoles = [ 'Admin', 'Manager', 'Staff' ];

  const [users, setUsers] = useState<Array<{id:string; username:string; password:string; fullName:string; email:string; phone:string; organization_id:string; department_id:string; status:'active'|'inactive'}>>([
    { id: 'user-1', username: 'h-mo-009', password: 'secret', fullName: 'KyawSoeKhine', email: 'kyawsoekhine@efimm.com', phone: '09-1234567', organization_id: 'org-1', department_id: 'dept-1', status: 'active' }
  ]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organizationId, setOrganizationId] = useState(mockOrgs[0].id);
  const [departmentId, setDepartmentId] = useState(mockDepts[0].id);
  const [status, setStatus] = useState<'active'|'inactive'>('active');

  const addUser = () => {
    if (!username.trim() || !fullName.trim()) return;
    const id = `user-${Date.now()}`;
    setUsers(prev => [...prev, { id, username: username.trim(), password, fullName: fullName.trim(), email: email.trim(), phone: phone.trim(), organization_id: organizationId, department_id: departmentId, status }]);
    setUsername(''); setPassword(''); setFullName(''); setEmail(''); setPhone(''); setStatus('active');
  };

  const deleteUser = (id:string) => setUsers(prev => prev.filter(u=>u.id!==id));

  return (
    <div className="space-y-6 animate-in">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage system users and their organization/department assignments</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="font-bold">UserCode :</Label>
              <Input value={username} onChange={e=>setUsername(e.target.value)} placeholder="usercode" />
            </div>
            <div>
              <Label className="font-bold">Full Name :</Label>
              <Input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Full name" />
            </div>
            <div>
              <Label className="font-bold">Password :</Label>
              <Input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
            </div>
            <div>
              <Label className="font-bold">Email :</Label>
              <Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@example.com" />
            </div>
            <div>
              <Label className="font-bold">Phone :</Label>
              <Input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="09-xxxxxxx" />
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
              <Label className="font-bold">Department :</Label>
              <Select value={departmentId} onValueChange={v=>setDepartmentId(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockDepts.map(d=> <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                </SelectContent>
              </Select>
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
            <div className="md:col-span-3">
              <Button onClick={addUser}>Add User</Button>
            </div>
          </div>

          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>UserCode</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(u=> (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.username}</TableCell>
                    <TableCell>{u.fullName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.phone}</TableCell>
                    <TableCell>{mockOrgs.find(o=>o.id===u.organization_id)?.name || u.organization_id}</TableCell>
                    <TableCell>{mockDepts.find(d=>d.id===u.department_id)?.name || u.department_id}</TableCell>
                    <TableCell>{u.status}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive" onClick={()=>deleteUser(u.id)}>Delete</Button>
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
  )
}
