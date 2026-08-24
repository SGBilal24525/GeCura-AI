'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Home,
  Users,
  Package,
  Settings,
  LogOut,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  CreditCard,
  Cpu,
  FileText,
  CalendarPlus,
  Store,
  BarChart2,
  LifeBuoy,
  Megaphone,
  History,
  Lightbulb,
  Search,
  ChevronsLeft,
  ChevronsRight,
  Bell,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/users', label: 'User Management', icon: Users },
    { href: '/admin/billing', label: 'Billing', icon: CreditCard },
    { href: '/admin/plans', label: 'Plans Management', icon: Package },
    { href: '/admin/content', label: 'Content', icon: FileText },
    { href: '/admin/appointments', label: 'Appointments', icon: CalendarPlus },
    { href: '/admin/marketplace', label: 'Marketplace', icon: Store },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
    { href: '/admin/ai-usage', label: 'AI Usage', icon: Zap },
    { href: '/admin/ai-management', label: 'AI Management', icon: Cpu },
    { href: '/admin/ai-feedback', label: 'AI Feedback', icon: Lightbulb },
    { href: '/admin/support', label: 'Support Tickets', icon: LifeBuoy },
    { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
    { href: '/admin/logs', label: 'Audit Logs', icon: History },
    {
      href: '/admin/feature-controls',
      label: 'Feature Controls',
      icon: SlidersHorizontal,
    },
  ];

  return (
    <div className={cn("grid min-h-screen w-full transition-all duration-300", isCollapsed ? "md:grid-cols-[60px_1fr]" : "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]")}>
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className={cn("flex h-14 items-center border-b lg:h-[60px]", isCollapsed ? "justify-center" : "px-4 lg:px-6")}>
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold"
            >
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className={cn(isCollapsed && "sr-only")}>CuraAI Admin</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto">
            <nav className={cn("grid items-start text-sm font-medium", isCollapsed ? "px-2" : "px-2 lg:px-4")}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    pathname === link.href && 'bg-muted text-primary',
                    isCollapsed && 'justify-center'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className={cn(isCollapsed && "sr-only")}>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card className={cn(isCollapsed && 'hidden')}>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Manage global settings for the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Link href="/admin/system">
                   <Button size="sm" className={cn("w-full", pathname === '/admin/system' && 'bg-muted text-primary hover:bg-muted/90')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Go to Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <div className="border-t pt-4 mt-4">
              <Link href="/">
                <Button variant="ghost" className={cn("w-full justify-start", isCollapsed && "justify-center px-2")}>
                  <LogOut className="h-4 w-4" />
                   <span className={cn("ml-2", isCollapsed && "sr-only")}>Logout</span>
                </Button>
              </Link>
               <Button onClick={() => setIsCollapsed(!isCollapsed)} variant="ghost" className={cn("w-full justify-start mt-2", isCollapsed && "justify-center px-2")}>
                  {isCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
                  <span className={cn("ml-2", isCollapsed && "sr-only")}>{isCollapsed ? "Expand" : "Collapse"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="flex-1">
             <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                sgbilal33845@gmail.com
              </span>
              <Badge>Admin</Badge>
              <ShieldCheck className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
