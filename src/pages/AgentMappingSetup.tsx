import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

type User = { id: string; username: string; fullName: string };
type Mapping = { id: string; userId: string; username: string; agentLicenseNo: string };

const defaultMockUsers: User[] = [
  { id: 'user-1', username: 'h-mo-009', fullName: 'KyawSoeKhine' },
  { id: 'user-2', username: 'mg-mg-001', fullName: 'Mg Mg' }
];

export default function AgentMappingSetup(){
  const [users, setUsers] = useState<User[]>([]);
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [agentLicenseNo, setAgentLicenseNo] = useState('');

  useEffect(()=>{
    // try load users from localStorage if UserSetup saved them, otherwise fallback to mock
    try {
      const raw = localStorage.getItem('users');
      if (raw) {
        const parsed = JSON.parse(raw) as any[];
        const mapped = parsed.map(u=>({ id: u.id || u.username, username: u.username || u.id, fullName: u.fullName || u.username }));
        setUsers(mapped);
        if (mapped.length) setSelectedUserId(mapped[0].id);
      } else {
        setUsers(defaultMockUsers);
        setSelectedUserId(defaultMockUsers[0].id);
      }
    } catch (e) {
      setUsers(defaultMockUsers);
      setSelectedUserId(defaultMockUsers[0].id);
    }

    // load existing mappings
    try {
      const rawMap = localStorage.getItem('agentMappings');
      if (rawMap) setMappings(JSON.parse(rawMap));
    } catch (e) { /* ignore */ }
  }, []);

  useEffect(()=>{
    localStorage.setItem('agentMappings', JSON.stringify(mappings));
  }, [mappings]);

  const addMapping = () => {
    if (!selectedUserId || !agentLicenseNo.trim()) return;
    const user = users.find(u=>u.id===selectedUserId);
    const id = `map-${Date.now()}`;
    const newMap: Mapping = { id, userId: selectedUserId, username: user?.username || selectedUserId, agentLicenseNo: agentLicenseNo.trim() };
    setMappings(prev=>[...prev, newMap]);
    setAgentLicenseNo('');
  };

  const removeMapping = (id: string) => {
    setMappings(prev=>prev.filter(m=>m.id!==id));
  };

  return (
    <div className="space-y-6 animate-in">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Agent Mapping</CardTitle>
            <CardDescription>Map system users to Agent License Numbers so notifications and tasks can be routed to agents.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="font-bold">User</Label>
              <Select value={selectedUserId} onValueChange={v=>setSelectedUserId(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {users.map(u=> <SelectItem key={u.id} value={u.id}>{u.username} — {u.fullName}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-bold">Agent License No</Label>
              <Input value={agentLicenseNo} onChange={e=>setAgentLicenseNo(e.target.value)} placeholder="e.g. AG-12345" />
            </div>
            <div className="flex items-end">
              <Button onClick={addMapping}>Add Mapping</Button>
            </div>
          </div>

          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Agent License No</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mappings.map(m=> (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.username}</TableCell>
                    <TableCell>{m.agentLicenseNo}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive" onClick={()=>removeMapping(m.id)}>Remove</Button>
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
