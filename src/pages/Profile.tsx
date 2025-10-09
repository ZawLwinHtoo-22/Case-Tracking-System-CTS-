import { User, Mail, Phone, Building, Calendar, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  return (
    <div className="space-y-6 animate-in">
      <div className="rounded-lg bg-gradient-primary p-8 text-white">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <User className="h-12 w-12" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Admin User</h2>
            <p className="mt-1 text-white/80">System Administrator</p>
            <div className="mt-3 flex gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                Admin
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">admin@workflow.com</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <Phone className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">+91 98765 43210</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <Building className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">Administration</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="font-medium">January 15, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Access & Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
                <Shield className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium">System Administrator</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium">Permissions</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Full Access</Badge>
                <Badge variant="outline">User Management</Badge>
                <Badge variant="outline">System Config</Badge>
                <Badge variant="outline">Reports</Badge>
                <Badge variant="outline">Analytics</Badge>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3 pt-2">
              <Button className="flex-1">Edit Profile</Button>
              <Button variant="outline" className="flex-1">Change Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Updated motor proposal MOT-001", time: "2 hours ago" },
              { action: "Sent notification to Survey Team", time: "5 hours ago" },
              { action: "Created new user account", time: "1 day ago" },
              { action: "Modified system settings", time: "2 days ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-4">
                <p className="text-sm">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
