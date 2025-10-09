import { Users, Shield, FolderTree, Menu, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const setupItems = [
  {
    icon: FolderTree,
    title: "Departments",
    description: "Manage organizational departments and their hierarchy",
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
];

export default function Setup() {
  return (
    <div className="space-y-6 animate-in">
      <div className="rounded-lg bg-gradient-primary p-6 text-white">
        <h2 className="text-2xl font-bold">System Setup</h2>
        <p className="mt-2 text-white/80">Configure departments, roles, users, and application settings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {setupItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="hover-lift cursor-pointer">
              <CardHeader>
                <div className={`${item.color} mb-4 flex h-12 w-12 items-center justify-center rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

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
