'use client';

import { useState, useEffect, ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BrainCircuit,
  Loader2,
  BookOpen,
  ScanSearch,
  Stethoscope,
  Target,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Mock Data
const topMetricsData = {
  learningSessions: 82,
  imageAnalyses: 35,
  aiConsultations: 4,
  topTopic: 'Pharmacology',
};

const aiSummary = "Based on your activity, you're strong in pharmacology but might want to revise cardiology topics. Your most frequent AI Doctor consultations are about mild headaches.";

const usageTrendsData = [
  { date: 'Mon', Learning: 4, SmartAnswer: 2, Doctor: 0 },
  { date: 'Tue', Learning: 3, SmartAnswer: 5, Doctor: 1 },
  { date: 'Wed', Learning: 6, SmartAnswer: 3, Doctor: 2 },
  { date: 'Thu', Learning: 5, SmartAnswer: 4, Doctor: 0 },
  { date: 'Fri', Learning: 7, SmartAnswer: 6, Doctor: 1 },
  { date: 'Sat', Learning: 2, SmartAnswer: 1, Doctor: 0 },
  { date: 'Sun', Learning: 1, SmartAnswer: 0, Doctor: 0 },
];

const learningFocusData = [
  { name: 'Pharmacology', value: 45, fill: 'hsl(var(--chart-1))' },
  { name: 'Cardiology', value: 25, fill: 'hsl(var(--chart-2))' },
  { name: 'Pathology', value: 15, fill: 'hsl(var(--chart-3))' },
  { name: 'Neurology', value: 10, fill: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 5, fill: 'hsl(var(--chart-5))' },
];

const aiDoctorInsightsData = {
    totalConsultations: 4,
    mostCommonSymptom: 'Headache',
    recommendationsFollowed: 2
};

const chartConfig: ChartConfig = {
  Learning: { label: "Learning", color: "hsl(var(--chart-1))" },
  SmartAnswer: { label: "Smart Answer", color: "hsl(var(--chart-2))" },
  Doctor: { label: "AI Doctor", color: "hsl(var(--chart-3))" },
};

const learningFocusChartConfig: ChartConfig = {
    Pharmacology: { label: "Pharmacology" },
    Cardiology: { label: "Cardiology" },
    Pathology: { label: "Pathology" },
    Neurology: { label: "Neurology" },
    Other: { label: "Other" },
};

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-24 border-2 border-dashed rounded-lg">
      <BrainCircuit className="h-16 w-16 text-muted-foreground/50 mb-4" />
      <h3 className="text-2xl font-semibold">Not enough data yet.</h3>
      <p className="text-muted-foreground mt-2 max-w-md">
        Use CuraAI more to unlock personalized insights and understand your learning & consultation patterns.
      </p>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: ReactNode; title: string; value: string | number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function LockedInsightCard({title, description}: {title: string, description: string}) {
    return (
        <Card className="flex flex-col items-center justify-center text-center p-6 bg-muted/50 border-dashed">
            <CardHeader className="p-0">
              <div className="text-muted-foreground mb-4"><Loader2 className="h-8 w-8 animate-spin" /></div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
        </Card>
    )
}

export default function InsightPage() {
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30');
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    const storedPlan = localStorage.getItem('userPlan') || 'free';
    setPlan(storedPlan);
    setIsLoading(false);
  }, []);

  const planTiers = { free: 0, standard: 1, premium: 2 };
  const userTier = plan ? planTiers[plan as keyof typeof planTiers] : 0;

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!hasData) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <BrainCircuit /> Insights
          </h1>
          <p className="text-muted-foreground">
            Understand your learning & consultation patterns.
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Top Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<BookOpen />} title="Learning Sessions" value={topMetricsData.learningSessions} />
        <StatCard icon={<ScanSearch />} title="Image Analyses" value={userTier >= 1 ? topMetricsData.imageAnalyses : 'N/A'} />
        <StatCard icon={<Stethoscope />} title="AI Consultations" value={userTier >= 2 ? topMetricsData.aiConsultations : 'N/A'} />
        <StatCard icon={<Target />} title="Top Topic" value={topMetricsData.topTopic} />
      </div>

      {/* AI Summary */}
      {userTier >= 2 && (
        <Alert className="bg-primary/5 border-primary/20">
          <Sparkles className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary font-semibold">AI-Generated Insight</AlertTitle>
          <AlertDescription>
            {aiSummary}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Usage Trends */}
        <div className="lg:col-span-2">
            {userTier >= 1 ? (
            <Card className="h-full">
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp /> Usage Trends</CardTitle>
                <CardDescription>Your activity over the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <ResponsiveContainer>
                    <LineChart data={usageTrendsData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="Learning" stroke="var(--color-Learning)" strokeWidth={2} dot={false} />
                        {userTier >= 1 && <Line type="monotone" dataKey="SmartAnswer" stroke="var(--color-SmartAnswer)" strokeWidth={2} dot={false} />}
                        {userTier >= 2 && <Line type="monotone" dataKey="Doctor" stroke="var(--color-Doctor)" strokeWidth={2} dot={false} />}
                    </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
                </CardContent>
            </Card>
            ) : (
                <LockedInsightCard title="Usage Trends" description="Upgrade to Standard to see your activity trends."/>
            )}
        </div>
        
        {/* Learning Focus */}
         <div className="lg:col-span-1">
            {userTier >= 1 ? (
                <Card className="h-full">
                    <CardHeader>
                    <CardTitle>Learning Focus</CardTitle>
                    <CardDescription>Your most studied topics.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                    <ChartContainer config={learningFocusChartConfig} className="h-[250px] w-full">
                        <ResponsiveContainer>
                        <PieChart>
                            <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                            <Pie data={learningFocusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {learningFocusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            </Pie>
                        </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                    </CardContent>
                </Card>
            ) : (
                 <LockedInsightCard title="Learning Focus" description="Upgrade to Standard to see your topic breakdown."/>
            )}
        </div>
      </div>

       {/* AI Doctor Insights */}
       {userTier >= 2 && (
         <Card>
            <CardHeader>
                <CardTitle>AI Doctor Insights</CardTitle>
                <CardDescription>A summary of your health-related interactions.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
                <StatCard icon={<Stethoscope />} title="Total Consultations" value={aiDoctorInsightsData.totalConsultations} />
                <StatCard icon={<TrendingUp />} title="Most Common Symptom" value={aiDoctorInsightsData.mostCommonSymptom} />
                 <StatCard icon={<Target />} title="Recommendations Followed" value={aiDoctorInsightsData.recommendationsFollowed} />
            </CardContent>
         </Card>
       )}
    </div>
  );
}
