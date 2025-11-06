import { ReactNode, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, TrendingUp, Settings, User, Bell, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getNotifications, NotificationItem } from "@/lib/notifications";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: TrendingUp, label: "Tracking", path: "/tracking" },
  { icon: Home, label: "Notification Process", path: "/Dashboard" },
  { icon: TrendingUp, label: "To Do Tasks", path: "/ReceiveNoti" },
  
  //{ icon: Plus, label: "New Proposal", path: "/tracking/motor/new" },
  { icon: Settings, label: "Setup", path: "/setup" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();



function NotificationList() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    try {
      const list = getNotifications();
      setNotifications(list);
    } catch (e) {
      setNotifications([]);
    }
  }, []);

  if (notifications.length === 0) {
    return <div className="text-sm text-muted-foreground">No notifications</div>;
  }

  return (
    <div className="space-y-2 max-h-80 overflow-auto">
      {notifications.map((n) => (
        <Link
          key={n.notificationNo}
          to={n.proposalNo ? `/tracking` : `#`}
          className="flex items-start gap-3 p-2 rounded-md hover:bg-muted"
        >
          <div className="flex-1">
            <div className="text-sm font-medium">{n.sender ?? "Unknown"}</div>
            {n.description && <div className="text-xs text-muted-foreground">{n.description}</div>}
          </div>
          <div className="text-xs text-muted-foreground whitespace-nowrap">{n.createdAt ? format(new Date(n.createdAt), "dd/MM HH:mm") : ""}</div>
        </Link>
      ))}
      <div className="pt-2">
        <Link to="/ReceiveNoti" className="text-sm text-primary">
          View all
        </Link>
      </div>
    </div>
  );
}
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#00907f]">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
            {/* logo inside white bordered box */}
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white border border-white/30 p-1 shadow-sm">
              <img src="/efi1.png" alt="EFI logo" className="h-8 w-auto" />
            </div>
            <span className="ml-2 text-lg font-semibold text-white">Case Tracking System</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-white/90")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/30 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary">
                <User className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-sidebar-foreground">Admin User</p>
                <p className="truncate text-xs text-sidebar-foreground/60">admin@workflow.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <h1 className="text-xl font-semibold text-foreground">
            {navItems.find((item) => item.path === location.pathname)?.label || ""}
          </h1>
          
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative bg-destructive/10 text-destructive">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <NotificationList />
              </PopoverContent>
            </Popover>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
