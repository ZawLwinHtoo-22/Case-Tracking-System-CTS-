import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Shield, FolderTree, Menu, Settings, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const setupItems = [
  {
    icon: FolderTree,
    title: "Organizations",
    description: "Manage Organizations and their hierarchy",
    color: "bg-primary"
  },
  {
    icon: FolderTree,
    title: "Departments",
    description: "Manage Departments and their hierarchy",
    color: "bg-primary"
  },
  {
    icon: Shield,
    title: "Roles",
    description: "Define user roles and permissions",
    color: "bg-secondary"
  },
  {
    icon: Users,
    title: "Users",
    description: "Manage user accounts and access",
    color: "bg-success"
  },
  {
    icon: Menu,
    title: "Menus",
    description: "Configure application menus and navigation",
    color: "bg-warning"
  },
  {
    icon: FolderTree,
    title: "Agents Mapping",
    description: "Manage Agent Mapping with organization user and their hierarchy",
   color: "bg-primary"
  },
];

export default function Setup() {
  // Organizations state (in-memory)
  const [organizations, setOrganizations] = useState<Array<{id: string; name: string; type: string; code: string; address: string; status: "active" | "inactive";}>>([
    { id: "org-1", name: "EFI Insurance", type: "Insurance", code: "EFI", address: "No.1 Insure St, Yangon", status: "active" },
    { id: "org-2", name: "EFD Bank", type: "Bank", code: "EFD", address: "10 Bank Rd, Mandalay", status: "active" }
  ]);
  const [showOrgDialog, setShowOrgDialog] = useState(false);
  const [editingOrgId, setEditingOrgId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", type: "Insurance", code: "", address: "", status: "active" as "active" | "inactive" });

  const openNewOrg = () => {
    setEditingOrgId(null);
    setForm({ name: "", type: "Insurance", code: "", address: "", status: "active" });
    setShowOrgDialog(true);
  };

  const openEditOrg = (id: string) => {
    const org = organizations.find(o => o.id === id);
    if (!org) return;
    setEditingOrgId(id);
    setForm({ name: org.name, type: org.type, code: org.code, address: org.address, status: org.status });
    setShowOrgDialog(true);
  };

  const saveOrg = () => {
    if (!form.name.trim() || !form.code.trim()) return; // basic validation
    if (editingOrgId) {
      setOrganizations(prev => prev.map(o => o.id === editingOrgId ? { ...o, ...form } : o));
    } else {
      const id = `org-${Date.now()}`;
      setOrganizations(prev => [...prev, { id, ...form }]);
    }
    setShowOrgDialog(false);
  };

  const deleteOrg = (id: string) => {
    setOrganizations(prev => prev.filter(o => o.id !== id));
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="rounded-lg bg-gradient-primary p-6 text-white">
        <h2 className="text-2xl font-bold">System Setup</h2>
        <p className="mt-2 text-white/80">Configure organizations, roles, users, agents mapping and application settings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {setupItems.map((item) => {
          const Icon = item.icon;
          const to = item.title === 'Organizations' ? '/setup/organizations' : item.title === 'Departments' ? '/setup/departments' : item.title === 'Users' ? '/setup/users' : '#';
          return (
            <Link key={item.title} to={to} className="block">
              <Card className="hover-lift cursor-pointer">
                <CardHeader>
                  <div className={`${item.color} mb-4 flex h-12 w-12 items-center justify-center rounded-xl`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Organizations moved to OrganizationSetup page */}

      <Card>
        <CardContent className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <Settings className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              Select a setup option to configure
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
