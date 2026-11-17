'use client';

import { useState, useEffect, useMemo, ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Activity,
  BookOpen,
  ScanSearch,
  Stethoscope,
  Bookmark,
  Trash2,
  Search,
  Loader2,
  Calendar,
  Eye,
} from 'lucide-react';
import { activityData, ActivityItem } from './data';
import { Badge } from '@/components/ui/badge';
import { format, subDays, formatDistanceToNow } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const activityMetadata: { [key: string]: { icon: ReactNode, color: string } } = {
    Learning: { icon: <BookOpen className="h-5 w-5" />, color: 'text-blue-500' },
    'Smart Answer': { icon: <ScanSearch className="h-5 w-5" />, color: 'text-green-500' },
    'AI Doctor': { icon: <Stethoscope className="h-5 w-5" />, color: 'text-red-500' },
    Saved: { icon: <Bookmark className="h-5 w-5" />, color: 'text-yellow-500' },
    Removed: { icon: <Trash2 className="h-5 w-5" />, color: 'text-gray-500' },
};

function EmptyState() {
    return (
        <div className="col-span-full flex flex-col items-center justify-center text-center py-24 border-2 border-dashed rounded-lg">
            <Activity className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-2xl font-semibold">No activity yet.</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
                Your learning, image analysis, and consultations will appear here once you start using CuraAI.
            </p>
        </div>
    )
}

function ActivityDetailModal({ activity, isOpen, onOpenChange }: { activity: ActivityItem | null, isOpen: boolean, onOpenChange: (open: boolean) => void }) {
    if (!activity) return null;
    
    const metadata = activityMetadata[activity.type] || {};

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <div className={`p-2 bg-muted rounded-full ${metadata.color}`}>{metadata.icon}</div>
                        Activity Details
                    </DialogTitle>
                    <DialogDescription className='pt-2'>{activity.title}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <h4 className="font-semibold text-sm">Description</h4>
                        <p className="text-muted-foreground text-sm">{activity.description}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">Feature</h4>
                        <p className="text-muted-foreground text-sm">{activity.sourceFeature}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-sm">Timestamp</h4>
                        <p className="text-muted-foreground text-sm">{format(new Date(activity.timestamp), 'PPP p')}</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default function ActivityPage() {
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateRange, setDateRange] = useState('7');

  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const { toast } = useToast();


  useEffect(() => {
    const storedPlan = localStorage.getItem('userPlan') || 'free';
    setPlan(storedPlan);
    setIsLoading(false);
  }, []);

  const handleViewDetails = (item: ActivityItem) => {
    setSelectedActivity(item);
  }

  const handleSaveItem = (item: ActivityItem) => {
      toast({
          title: "Saved to Library",
          description: `"${item.title}" has been saved.`
      });
  }

  const filteredActivities = useMemo(() => {
    if (!plan) return [];

    let activities = activityData;

    // Plan-based history limits
    if (plan === 'free') {
        const sevenDaysAgo = subDays(new Date(), 7);
        activities = activities.filter(item => new Date(item.timestamp) >= sevenDaysAgo);
    } else if (plan === 'standard') {
        const thirtyDaysAgo = subDays(new Date(), 30);
        activities = activities.filter(item => new Date(item.timestamp) >= thirtyDaysAgo);
    }

    // Filter by date range selection
    if (dateRange !== 'all') {
        const days = parseInt(dateRange, 10);
        const cutOffDate = subDays(new Date(), days);
        activities = activities.filter(item => new Date(item.timestamp) >= cutOffDate);
    }
    
    // Filter by type
    if (typeFilter !== 'All') {
        activities = activities.filter(item => item.type === typeFilter);
    }

    // Filter by search term
    if (searchTerm) {
        activities = activities.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  }, [plan, searchTerm, typeFilter, dateRange]);

  const activityTypes = ['All', ...new Set(activityData.map(a => a.type))];

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <TooltipProvider>
      <ActivityDetailModal activity={selectedActivity} isOpen={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)} />
      <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
              <Activity /> Activity
            </h1>
            <p className="text-muted-foreground">
              Your recent actions on CuraAI.
            </p>
          </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                  placeholder="Search activity..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
              <div className="flex gap-4">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                          {activityTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                  </Select>
                  <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="w-full md:w-[180px]">
                          <Calendar className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="1">Today</SelectItem>
                          <SelectItem value="7">Last 7 days</SelectItem>
                          <SelectItem value="30">Last 30 days</SelectItem>
                          <SelectItem value="all">All Time</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
              {filteredActivities.length > 0 ? (
                  <div className="divide-y">
                      {filteredActivities.map(item => {
                          const metadata = activityMetadata[item.type] || {};
                          return (
                              <div key={item.id} className="flex items-start gap-4 p-4">
                                  <div className={`mt-1 p-2 bg-muted rounded-full ${metadata.color}`}>
                                      {metadata.icon}
                                  </div>
                                  <div className="flex-1">
                                      <p className="font-semibold">{item.title}</p>
                                      <p className="text-sm text-muted-foreground">{item.description}</p>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                        <Badge variant="outline">{item.sourceFeature}</Badge>
                                        <span>•</span>
                                        <span>{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-0.5">
                                      <Tooltip>
                                          <TooltipTrigger asChild>
                                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewDetails(item)}>
                                                  <Eye className="h-4 w-4" />
                                              </Button>
                                          </TooltipTrigger>
                                          <TooltipContent><p>View Details</p></TooltipContent>
                                      </Tooltip>
                                      <Tooltip>
                                          <TooltipTrigger asChild>
                                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleSaveItem(item)}>
                                                  <Bookmark className="h-4 w-4" />
                                              </Button>
                                          </TooltipTrigger>
                                          <TooltipContent><p>Save to Library</p></TooltipContent>
                                      </Tooltip>
                                  </div>
                              </div>
                          )
                      })}
                  </div>
              ) : (
                  <EmptyState />
              )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
