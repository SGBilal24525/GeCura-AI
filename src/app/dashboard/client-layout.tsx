'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  BookOpen,
  ScanLine,
  Stethoscope,
  History,
  Settings,
  LogOut,
  Bell,
  Lock,
  LayoutList,
  Image as ImageIcon,
  Pill,
  MessageSquare,
  BarChart2,
  Library,
  Bookmark,
  Zap,
  CreditCard,
  User,
  LifeBuoy,
  Scale,
  Search,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  Activity,
  BrainCircuit,
  CalendarPlus,
  CheckCircle,
  Cpu,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const notifications = [
    {
        icon: <Stethoscope className="h-5 w-5 text-red-500" />,
        title: "Appointment Confirmed",
        description: "Your appointment with Dr. Sameer Ahmed is confirmed for tomorrow.",
        time: "10m ago",
    },
    {
        icon: <BookOpen className="h-5 w-5 text-blue-500" />,
        title: "New Insight Available",
        description: "AI has identified a new learning pattern in your recent activity.",
        time: "2h ago",
    },
    {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        title: "Payment Successful",
        description: "Your monthly subscription has been successfully renewed.",
        time: "1d ago",
    }
];

function NotificationPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Open notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
                 <Card className="border-0 shadow-none">
                    <CardHeader className="p-4 border-b">
                        <CardTitle className="text-base">Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {notifications.map((notification, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 hover:bg-muted/50">
                                    <div className="p-1 rounded-full bg-muted mt-1">
                                        {notification.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold">{notification.title}</p>
                                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                                        <p className="text-xs text-muted-foreground/80 mt-1">{notification.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="p-2 border-t">
                        <Button variant="link" size="sm" className="w-full" asChild>
                            <Link href="/dashboard/activity">View all activity</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </PopoverContent>
        </Popover>
    )
}


export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [plan, setPlan] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const storedPlan = localStorage.getItem('userPlan') || 'free';
    setPlan(storedPlan);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Home, plans: ['free', 'standard', 'premium'] },
    {
      href: '/dashboard/features',
      label: 'Features',
      icon: Cpu,
      plans: ['free', 'standard', 'premium'],
      subLinks: [
        { href: '/dashboard/learn', label: 'Learn', icon: BookOpen, plans: ['free', 'standard', 'premium'] },
        { href: '/dashboard/smart-analysis', label: 'Smart Analysis', icon: ScanLine, plans: ['standard', 'premium'] },
        { href: '/dashboard/consultation', label: 'AI Doctor', icon: Stethoscope, plans: ['premium'] },
      ]
    },
    { href: '/dashboard/appointments', label: 'Appointments', icon: CalendarPlus, plans: ['standard', 'premium'] },
    { href: '/dashboard/appointments/history', label: 'Appt. History', icon: History, plans: ['standard', 'premium'] },
    { href: '/dashboard/library', label: 'Library', icon: Library, plans: ['free', 'standard', 'premium'] },
    { href: '/dashboard/saved', label: 'Saved', icon: Bookmark, plans: ['standard', 'premium'] },
    { href: '/dashboard/activity', label: 'Activity', icon: Activity, plans: ['free', 'standard', 'premium'] },
    { href: '/dashboard/insight', label: 'Insights', icon: BrainCircuit, plans: ['free', 'standard', 'premium'] },
    { href: '/dashboard/usage', label: 'Usage', icon: Zap, plans: ['free', 'standard', 'premium'] },
    { href: '/dashboard/billing', label: 'Billing', icon: CreditCard, plans: ['free', 'standard', 'premium'] },
  ];

  const accountLinks = [
    { href: '/dashboard/profile', label: 'Profile', icon: User, plans: ['free', 'standard', 'premium'] },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings, plans: ['free', 'standard', 'premium'] },
    { href: '/dashboard/support', label: 'Support', icon: LifeBuoy, plans: ['free', 'standard', 'premium'] },
    { href: '/dashboard/legal', label: 'Legal', icon: Scale, plans: ['free', 'standard', 'premium'] },
  ];

  const allLinks = [...navLinks.flatMap(l => l.subLinks ? [l, ...l.subLinks] : [l]), ...accountLinks];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term && plan) {
        const results = allLinks
            .filter(link => link.label.toLowerCase().includes(term.toLowerCase()))
            .slice(0, 5);
        setSearchResults(results);
    } else {
        setSearchResults([]);
    }
  };

  const handleResultClick = (href: string) => {
    router.push(href);
    setSearchTerm('');
    setSearchResults([]);
  };

  if (!plan) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  const planBadge = {
    premium: { text: 'Premium', className: 'bg-green-600 hover:bg-green-700 text-white' },
    standard: { text: 'Standard', className: 'bg-blue-600 hover:bg-blue-700 text-white' },
    free: { text: 'Free', className: 'bg-gray-600 hover:bg-gray-700 text-white' },
  }[plan as 'premium' | 'standard' | 'free'] || { text: 'Free', className: 'bg-gray-600 hover:bg-gray-700 text-white' };

  const renderLink = (link: any) => {
    const enabled = link.plans.includes(plan);
    const isActive = pathname === link.href;

    if (isCollapsed) {
        return (
             <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                    <Link
                        href={enabled ? link.href : '#'}
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:text-primary md:h-8 md:w-8",
                            isActive && "bg-accent text-primary",
                            !enabled && "cursor-not-allowed opacity-50"
                        )}
                         onClick={(e) => !enabled && e.preventDefault()}
                    >
                        <link.icon className="h-4 w-4" />
                        <span className="sr-only">{link.label}</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>{link.label}</p>
                    {!enabled && <p className="text-xs text-muted-foreground">Upgrade required</p>}
                </TooltipContent>
            </Tooltip>
        )
    }

    const linkContent = (
      <div className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary",
        isActive && "bg-muted text-primary",
        !enabled && "cursor-not-allowed opacity-50"
      )}>
        <link.icon className="h-4 w-4" />
        {link.label}
        {!enabled && <Lock className="h-4 w-4 ml-auto" />}
      </div>
    );
    
    if (!enabled) {
      return (
        <Tooltip key={link.href}>
          <TooltipTrigger asChild>
            <span className='w-full' tabIndex={0}>{linkContent}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upgrade to a higher plan to unlock.</p>
          </TooltipContent>
        </Tooltip>
      )
    }

    return (
      <Link key={link.href} href={link.href}>
        {linkContent}
      </Link>
    )
  }

  return (
    <TooltipProvider>
      <div className={cn(
          "grid min-h-screen w-full transition-all duration-300",
          isCollapsed ? "md:grid-cols-[60px_1fr]" : "md:grid-cols-[200px_1fr]"
        )}>
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col">
            <div className={cn("flex h-14 items-center border-b lg:h-[60px]", isCollapsed ? "justify-center" : "px-4 lg:px-6")}>
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Logo className="h-6 w-6 text-primary" />
                <span className={cn("text-primary font-headline text-lg", isCollapsed && "sr-only")}>CuraAI</span>
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="grid items-start px-2 text-base font-medium lg:px-4 py-4 text-foreground/90 dark:text-foreground">
                {navLinks.map((link) => {
                  if (link.subLinks && !isCollapsed) {
                    const isParentActive = pathname.startsWith(link.href) || link.subLinks.some(sl => pathname === sl.href);
                    return (
                      <Accordion type="single" collapsible className="w-full" key={link.label} defaultValue={isParentActive ? "item-1" : ""}>
                        <AccordionItem value="item-1" className="border-b-0">
                          <AccordionTrigger
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]>svg:last-child]:rotate-180",
                              isParentActive && "text-primary font-semibold"
                            )}
                          >
                            <link.icon className="h-4 w-4" />
                            <span className="flex-1 text-left">{link.label}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pl-4 pt-1 pb-0 space-y-1">
                            <Link
                              href={link.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground/80 transition-all hover:text-primary",
                                pathname === link.href && "bg-muted text-primary font-semibold"
                              )}
                            >
                               Overview
                            </Link>
                            {link.subLinks.map(subLink => {
                              const subLinkEnabled = subLink.plans.includes(plan);
                              const subLinkIsActive = pathname === subLink.href;
                              return (
                                <Link
                                  key={subLink.href}
                                  href={subLinkEnabled ? subLink.href : '#'}
                                  className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground/80 transition-all hover:text-primary",
                                    subLinkIsActive && "bg-muted text-primary font-semibold",
                                    !subLinkEnabled && "cursor-not-allowed opacity-50"
                                  )}
                                  onClick={(e) => !subLinkEnabled && e.preventDefault()}
                                >
                                  <subLink.icon className="h-4 w-4" />
                                  {subLink.label}
                                  {!subLinkEnabled && <Lock className="h-3 w-3 ml-auto" />}
                                </Link>
                              );
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )
                  }
                  return renderLink(link);
                })}
              </nav>
            </div>
            <div className="mt-auto p-2 border-t">
              <nav className="grid items-start px-2 text-base font-medium lg:px-4 text-foreground/90 dark:text-foreground">
                {accountLinks.map(renderLink)}
              </nav>
              <div className={cn("px-2 lg:px-4 pt-2", isCollapsed && "flex justify-center")}>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href="/">
                            <Button variant="ghost" className={cn("w-full justify-start", isCollapsed && "justify-center p-2")}>
                                <LogOut className="h-4 w-4" />
                                <span className={cn("ml-2", isCollapsed && "sr-only")}>Logout</span>
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    {isCollapsed && <TooltipContent side="right">Logout</TooltipContent>}
                 </Tooltip>
              </div>
              <div className={cn("px-2 pt-2 lg:px-4 mt-2 border-t", isCollapsed && "flex justify-center")}>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button onClick={toggleSidebar} variant="ghost" className={cn("w-full justify-start", isCollapsed && "justify-center p-2")}>
                            {isCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
                            <span className={cn("ml-2", isCollapsed && "sr-only")}>Collapse</span>
                        </Button>
                    </TooltipTrigger>
                    {isCollapsed && <TooltipContent side="right">Expand</TooltipContent>}
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className='flex-1'>
            <Popover open={searchResults.length > 0 && searchTerm.length > 0} onOpenChange={(isOpen) => !isOpen && setSearchResults([])}>
                <PopoverTrigger asChild>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search features, pages..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-80 lg:w-96"
                            value={searchTerm}
                            onChange={handleSearch}
                            autoComplete="off"
                        />
                        </div>
                    </form>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 mt-2">
                      <div className="flex flex-col space-y-1 p-1">
                        {searchResults.map(result => {
                            const isEnabled = result.plans.includes(plan);
                            return (
                                <Button
                                    key={result.href}
                                    variant="ghost"
                                    className="justify-start gap-2 h-auto py-2"
                                    onClick={() => handleResultClick(result.href)}
                                    disabled={!isEnabled}
                                >
                                    <result.icon className="h-4 w-4 text-muted-foreground" />
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">{result.label}</span>
                                        <span className="text-xs text-muted-foreground">{result.href}</span>
                                    </div>
                                    {!isEnabled && <Lock className="h-4 w-4 ml-auto" />}
                                </Button>
                            );
                        })}
                    </div>
                </PopoverContent>
            </Popover>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="default" className={cn(planBadge.className, 'text-white')}>
                {planBadge.text}
              </Badge>
              <ThemeToggle />
              <NotificationPopover />
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
