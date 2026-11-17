'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  Zap,
  Calendar as CalendarIcon,
  Download,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  ScanLine,
  Stethoscope,
  MoreHorizontal
} from 'lucide-react';
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';


// --- Mock Data ---
const kpiData = [
    { title: "Total AI Requests", value: "1,250,832", change: "+12.5% this month" },
    { title: "Requests Today", value: "35,120", change: "-2.1% from yesterday" },
    { title: "Avg. Requests / User", value: "18.5", change: "Daily average" },
    { title: "Peak Usage Hour", value: "2 PM - 3 PM", change: "Based on today's activity" },
];

const featureUsageData = [
  { name: 'Learning', value: 750000, fill: 'var(--color-learning)' },
  { name: 'Smart Answer', value: 400000, fill: 'var(--color-smart)' },
  { name: 'AI Doctor', value: 100832, fill: 'var(--color-doctor)' },
];

const planUsageData = [
  { plan: 'Free', learning: 400, smart: 150, doctor: 0 },
  { plan: 'Standard', learning: 800, smart: 600, doctor: 50 },
  { plan: 'Premium', learning: 1200, smart: 900, doctor: 400 },
];

const userUsageData = [
    { id: 'usr_1', email: 'olivia.martin@email.com', plan: 'Premium', feature: 'AI Doctor', requests: 5, lastActive: '5m ago', status: 'Normal' },
    { id: 'usr_2', email: 'liam.anderson@email.com', plan: 'Free', feature: 'Learning', requests: 198, lastActive: '10m ago', status: 'High Usage' },
    { id: 'usr_3', email: 'ava.robinson@email.com', plan: 'Standard', feature: 'Smart Answer', requests: 45, lastActive: '30m ago', status: 'Normal' },
    { id: 'usr_4', email: 'noah.carter@email.com', plan: 'Free', feature: 'Learning', requests: 250, lastActive: '1h ago', status: 'Limited' },
];

const limitData = {
    free: { name: 'Free Plan Daily Limit', used: 198, limit: 200 },
    soft: { name: 'Standard Plan Soft Limit', used: 85, limit: 100 },
    hard: { name: 'Premium Plan Hard Limit', used: 950, limit: 1000 },
}

const errorData = {
    failures: '25 (0.002%)',
    timeouts: '8 (0.0006%)',
    fallbacks: '150 (0.012%)',
};


const chartConfig: ChartConfig = {
  learning: { label: "Learning", color: "hsl(var(--chart-1))" },
  smart: { label: "Smart Answer", color: "hsl(var(--chart-2))" },
  doctor: { label: "AI Doctor", color: "hsl(var(--chart-3))" },
};


// --- Main Component ---
export default function AdminAiUsagePage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
                        <Zap /> AI Usage
                    </h1>
                    <p className="text-muted-foreground">
                        Monitor AI consumption, limits, and performance.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="30">
                        <SelectTrigger className="w-auto"><CalendarIcon className="mr-2 h-4 w-4" /><SelectValue placeholder="Date range" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Today</SelectItem>
                            <SelectItem value="7">Last 7 days</SelectItem>
                            <SelectItem value="30">Last 30 days</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="all-plans">
                        <SelectTrigger className="w-auto"><SelectValue placeholder="Filter by plan" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-plans">All Plans</SelectItem>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all-features">
                        <SelectTrigger className="w-auto"><SelectValue placeholder="Filter by feature" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-features">All Features</SelectItem>
                            <SelectItem value="learning">Learning</SelectItem>
                            <SelectItem value="smart-answer">Smart Answer</SelectItem>
                            <SelectItem value="ai-doctor">AI Doctor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Section 1: Key Performance Indicators */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpiData.map(kpi => (
                     <Card key={kpi.title} className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                            <p className="text-xs text-muted-foreground">{kpi.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Section 2 & 3: Feature & Plan Usage */}
            <div className="grid gap-4 lg:grid-cols-2">
                <Card className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle>Feature-Wise AI Consumption</CardTitle>
                        <CardDescription>Total AI requests by core feature.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                             <ResponsiveContainer>
                                <BarChart data={featureUsageData} layout="vertical">
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tickMargin={10} width={80} />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="value" radius={5} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <Card className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle>Plan-Wise AI Usage</CardTitle>
                        <CardDescription>Breakdown of AI calls by subscription plan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <ResponsiveContainer>
                                <BarChart data={planUsageData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="plan" tickLine={false} axisLine={false} tickMargin={8} />
                                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Bar dataKey="learning" stackId="a" name="Learning" fill="var(--color-learning)" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="smart" stackId="a" name="Smart Answer" fill="var(--color-smart)" />
                                    <Bar dataKey="doctor" stackId="a" name="AI Doctor" fill="var(--color-doctor)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

             {/* Section 4: User-Level AI Usage Table */}
             <Card className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                <CardHeader>
                    <CardTitle>User-Level AI Usage</CardTitle>
                    <CardDescription>Detailed breakdown of AI usage by individual users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Top Feature</TableHead>
                                <TableHead>Requests (24h)</TableHead>
                                <TableHead>Last Active</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userUsageData.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="font-medium">{user.email}</div>
                                        <div className="text-xs text-muted-foreground">{user.id}</div>
                                    </TableCell>
                                    <TableCell><Badge variant="outline">{user.plan}</Badge></TableCell>
                                    <TableCell>{user.feature}</TableCell>
                                    <TableCell>{user.requests}</TableCell>
                                    <TableCell>{user.lastActive}</TableCell>
                                    <TableCell><Badge variant={user.status === 'Limited' ? 'destructive' : user.status === 'High Usage' ? 'secondary' : 'default'}>{user.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="ghost"><MoreHorizontal /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>View Usage Detail</DropdownMenuItem>
                                                <DropdownMenuItem>Temporarily Limit User</DropdownMenuItem>
                                                <DropdownMenuItem>Flag for Review</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
             </Card>

            {/* Section 5 & 6: Limits & Errors */}
            <div className="grid gap-4 lg:grid-cols-2">
                <Card className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                    <CardHeader><CardTitle>AI Limits & Thresholds</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {Object.values(limitData).map(item => (
                            <div key={item.name}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium">{item.name}</span>
                                     <span className="text-sm text-muted-foreground">{item.used} / {item.limit}</span>
                                </div>
                                <Progress value={(item.used / item.limit) * 100} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                    <CardHeader><CardTitle>Error & Fallback Tracking</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Request Failures</span>
                            <span className="font-bold text-destructive">{errorData.failures}</span>
                        </div>
                         <div className="flex justify-between items-center">
                            <span className="text-sm">Timeout Events</span>
                            <span className="font-bold text-amber-600">{errorData.timeouts}</span>
                        </div>
                         <div className="flex justify-between items-center">
                            <span className="text-sm">Fallback Responses Used</span>
                            <span className="font-bold text-muted-foreground">{errorData.fallbacks}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>AI-Generated Insight</AlertTitle>
                <AlertDescription>
                    Learning feature accounts for 60% of total AI calls, with most coming from free-tier users.
                </AlertDescription>
            </Alert>
        </div>
    );
}
