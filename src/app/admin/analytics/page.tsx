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
  Users,
  DollarSign,
  Zap,
  Activity,
  ArrowUpRight,
  File,
  Calendar as CalendarIcon,
  Download,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


// --- Mock Data ---
const kpiData = [
    { title: "Total Revenue", value: "$10,245", change: "+15.2% from last month", icon: <DollarSign /> },
    { title: "Active Users", value: "1,258", change: "+201 this month", icon: <Users /> },
    { title: "AI Queries", value: "125,432", change: "+5% from yesterday", icon: <Zap /> },
    { title: "New Users", value: "89", change: "+12 today", icon: <Activity /> },
];

const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 700 },
  { name: 'May', users: 600 },
  { name: 'Jun', users: 800 },
  { name: 'Jul', users: 1258 },
];

const featureUsageData = [
    { name: 'Learning', queries: 85000 },
    { name: 'Smart Answer', queries: 32000 },
    { name: 'AI Doctor', queries: 8432 },
];

const planDistributionData = [
    { name: 'Free', value: 950, fill: 'hsl(var(--chart-1))' },
    { name: 'Standard', value: 196, fill: 'hsl(var(--chart-2))' },
    { name: 'Premium', value: 112, fill: 'hsl(var(--chart-3))' },
];

const aiPerformanceData = {
    avgResponseTime: '2.1s',
    errorRate: '0.8%',
    userFeedbackScore: '4.7/5',
    flaggedResponses: 3,
};

const revenueData = {
    mrr: '$1,250.00',
    premiumRevenue: '$850.00',
    standardRevenue: '$400.00',
    cancellationRate: '2.5%',
};

const chartConfig: ChartConfig = {
  users: { label: "Users", color: "hsl(var(--chart-1))" },
  queries: { label: "AI Queries", color: "hsl(var(--chart-2))" },
  Free: { label: "Free" },
  Standard: { label: "Standard" },
  Premium: { label: "Premium" },
};


// --- Main Component ---
export default function AdminAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Reports & Analytics
                    </h1>
                    <p className="text-muted-foreground">
                    Platform performance and growth insights.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="30">
                        <SelectTrigger className="w-[180px]">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Date range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Today</SelectItem>
                            <SelectItem value="7">Last 7 days</SelectItem>
                            <SelectItem value="30">Last 30 days</SelectItem>
                            <SelectItem value="all">All Time</SelectItem>
                        </SelectContent>
                    </Select>
                     <Button variant="outline" className="h-10 gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                    </Button>
                </div>
            </div>

            {/* Section 1: Key Performance Indicators */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpiData.map(kpi => (
                     <Card key={kpi.title} className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                            <div className="text-muted-foreground">{kpi.icon}</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                            <p className="text-xs text-muted-foreground">{kpi.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Section 2: User Growth & Engagement */}
            <div className="grid gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                        <CardDescription>Total users over the last 7 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                             <ResponsiveContainer>
                                <LineChart data={userGrowthData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} dot={true} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle>Plan Distribution</CardTitle>
                        <CardDescription>How users are distributed across plans.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                         <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                                    <Pie data={planDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                         {planDistributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Section 3 & 4: Feature Usage & AI Performance */}
            <div className="grid gap-4 lg:grid-cols-3">
                 <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle>Feature Usage Analytics</CardTitle>
                        <CardDescription>AI queries by core feature.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <ResponsiveContainer>
                                <BarChart data={featureUsageData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="queries" fill="hsl(var(--primary))" radius={4} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <div className="space-y-4">
                    <Card className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle>AI Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex justify-between"><span>Avg. Response Time:</span><span className="font-bold">{aiPerformanceData.avgResponseTime}</span></div>
                            <div className="flex justify-between"><span>Error / Fallback Rate:</span><span className="font-bold">{aiPerformanceData.errorRate}</span></div>
                            <div className="flex justify-between"><span>User Feedback Score:</span><span className="font-bold">{aiPerformanceData.userFeedbackScore}</span></div>
                             <div className="flex justify-between items-center text-destructive">
                                <span>Flagged Responses:</span>
                                <span className="font-bold flex items-center gap-1">
                                    <AlertTriangle className="h-4 w-4"/>
                                    {aiPerformanceData.flaggedResponses}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>AI-Generated Insight</AlertTitle>
                        <AlertDescription>
                            This week, Learning usage is up by 18%.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
            
             {/* Section 5: Revenue & Subscription */}
             <Card className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                    <CardDescription>Key financial metrics for your subscription plans.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader><CardTitle className="text-base">Monthly Recurring Revenue</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl font-bold">{revenueData.mrr}</p></CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle className="text-base">Premium Plan Revenue</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl font-bold">{revenueData.premiumRevenue}</p></CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle className="text-base">Standard Plan Revenue</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl font-bold">{revenueData.standardRevenue}</p></CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle className="text-base">Cancellation Rate</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl font-bold text-destructive">{revenueData.cancellationRate}</p></CardContent>
                    </Card>
                </CardContent>
            </Card>

        </div>
    );
}
