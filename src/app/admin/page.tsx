'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Package, Zap, Activity, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';


const overviewCards = [
  {
    title: 'Total Users',
    value: '1,258',
    icon: <Users className="h-6 w-6 text-muted-foreground" />,
    change: '+20.1% from last month',
    href: '/admin/users'
  },
  {
    title: 'Active Users',
    value: '893',
    icon: <Activity className="h-6 w-6 text-muted-foreground" />,
    change: '+15.3% from last month',
    href: '/admin/analytics'
  },
  {
    title: 'AI Usage (Today)',
    value: '10,482 calls',
    icon: <Zap className="h-6 w-6 text-muted-foreground" />,
    change: '+5% from yesterday',
    href: '/admin/ai-usage'
  },
  {
    title: 'Premium Plans',
    value: '112',
    icon: <Package className="h-6 w-6 text-muted-foreground" />,
    change: '+12 since last week',
    href: '/admin/plans'
  },
];

const planDistribution = [
    { plan: 'Free Users', count: 950, color: 'bg-gray-400' },
    { plan: 'Standard Users', count: 196, color: 'bg-blue-500' },
    { plan: 'Premium Users', count: 112, color: 'bg-primary' },
]

const aiUsage = [
    { feature: 'Learning Module', percentage: 65, color: 'bg-green-500' },
    { feature: 'Smart Answer', percentage: 25, color: 'bg-yellow-500' },
    { feature: 'AI Doctor', percentage: 10, color: 'bg-red-500' },
]

const recentSignups = [
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', plan: 'Premium', date: '2024-07-20' },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', plan: 'Standard', date: '2024-07-20' },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', plan: 'Free', date: '2024-07-19' },
  { name: 'William Kim', email: 'will.kim@email.com', plan: 'Premium', date: '2024-07-18' },
];

const recentTickets = [
  { id: '#C-12345', user: 'Olivia Martin', subject: 'Issue with AI Doctor response', status: 'Open', priority: 'High' },
  { id: '#C-12344', user: 'Jackson Lee', subject: 'Billing question', status: 'In Progress', priority: 'Medium' },
  { id: '#C-12343', user: 'Sophia Davis', subject: 'Cannot upload image', status: 'Resolved', priority: 'High' },
];

const priorityStyles = {
  High: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
};

const statusStyles = {
    Open: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    Resolved: 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400'
}


export default function AdminDashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {overviewCards.map((card) => (
          <Link href={card.href} key={card.title}>
            <Card className='transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                {card.icon}
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.change}</p>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Plan-wise Distribution</CardTitle>
            <CardDescription>
              A breakdown of users across different plans.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {planDistribution.map(p => (
                    <div key={p.plan}>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{p.plan}</span>
                            <span className="text-sm font-medium">{p.count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                            <div className={`${p.color} h-2.5 rounded-full`} style={{width: `${(p.count/1258)*100}%`}}></div>
                        </div>
                    </div>
                ))}
             </div>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
          <CardHeader>
            <CardTitle>AI Usage Summary</CardTitle>
             <CardDescription>
              How the AI features are being used across the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="w-full flex rounded-full h-4 overflow-hidden">
                {aiUsage.map(u => (
                    <div key={u.feature} className={`${u.color}`} style={{width: `${u.percentage}%`}} title={`${u.feature}: ${u.percentage}%`}></div>
                ))}
             </div>
             <div className="mt-4 flex justify-around">
                {aiUsage.map(u => (
                    <div key={u.feature} className="flex items-center gap-2 text-sm">
                        <span className={`h-3 w-3 rounded-full ${u.color}`}></span>
                        <span>{u.feature}</span>
                    </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Recent Signups</CardTitle>
                    <CardDescription>New users who joined this week.</CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/admin/users">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentSignups.map(signup => (
                            <TableRow key={signup.email}>
                                <TableCell>
                                    <div className="font-medium">{signup.name}</div>
                                    <div className="text-sm text-muted-foreground">{signup.email}</div>
                                </TableCell>
                                <TableCell><Badge variant="outline">{signup.plan}</Badge></TableCell>
                                <TableCell className="text-right">{signup.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Recent Support Tickets</CardTitle>
                    <CardDescription>Open and recently updated tickets.</CardDescription>
                </div>
                 <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/admin/support">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Priority</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentTickets.map(ticket => (
                            <TableRow key={ticket.id}>
                                <TableCell>
                                    <div className="font-medium">{ticket.subject}</div>
                                    <div className="text-sm text-muted-foreground">from {ticket.user}</div>
                                </TableCell>
                                <TableCell><Badge className={cn('font-normal', statusStyles[ticket.status as keyof typeof statusStyles])}>{ticket.status}</Badge></TableCell>
                                <TableCell className="text-right"><Badge className={cn('font-normal', priorityStyles[ticket.priority as keyof typeof priorityStyles])}>{ticket.priority}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
