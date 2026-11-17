'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Settings,
  Users,
  Link as LinkIcon,
  Bell,
  FileText,
  Save,
  Sun,
  Moon,
  PlusCircle,
  Search,
  MoreHorizontal,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const kpiData = [
  { title: 'Total Admins', value: '4', icon: <Users /> },
  { title: 'Active Sessions', value: '2', icon: <Clock /> },
  { title: 'Roles Defined', value: '4', icon: <ShieldCheck /> },
  { title: '2FA Enabled', value: '2/4', icon: <ShieldCheck /> },
];

const adminUsersData = [
  { name: 'Admin User', email: 'admin@curaai.com', role: 'Super Admin', status: 'Active', lastLogin: '2 hours ago', avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Support Lead', email: 'support.lead@curaai.com', role: 'Moderator', status: 'Active', lastLogin: '1 day ago', avatar: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Dev Admin', email: 'dev@curaai.com', role: 'Viewer', status: 'Suspended', lastLogin: '1 week ago', avatar: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Finance Admin', email: 'finance@curaai.com', role: 'Finance', status: 'Invited', lastLogin: 'N/A', avatar: 'https://i.pravatar.cc/150?img=4' },
];

const roleStyles: { [key: string]: string } = {
  'Super Admin': 'bg-primary/10 text-primary border-primary/20',
  'Moderator': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'Viewer': 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  'Finance': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
};

const statusStyles: { [key: string]: string } = {
  'Active': 'bg-green-500/10 text-green-600 border-green-500/20',
  'Suspended': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  'Invited': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
};

function AdminsAndRolesContent() {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <div className="text-muted-foreground">{kpi.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admins Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Admins</CardTitle>
              <CardDescription>Manage all admin accounts and their roles.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name or email..." className="pl-8 w-full sm:w-auto" />
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Admin
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsersData.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline" className={cn(roleStyles[user.role])}>{user.role}</Badge></TableCell>
                  <TableCell><Badge variant="outline" className={cn(statusStyles[user.status])}>{user.status}</Badge></TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit Role</DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove Admin</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Management */}
      <Card>
        <CardHeader>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>Define role-based permissions for all system modules.</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground py-12">
            <p>Role &amp; Permissions Matrix will be here.</p>
        </CardContent>
        <CardFooter>
            <Button>Add New Role</Button>
        </CardFooter>
      </Card>

       {/* Security & 2FA Management */}
      <Card>
        <CardHeader>
            <CardTitle>Security &amp; 2FA Management</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground py-12">
            <p>2FA and Session Management settings will be here.</p>
        </CardContent>
      </Card>

      {/* Activity & Access Logs */}
      <Card>
        <CardHeader>
            <CardTitle>Activity &amp; Access Logs</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground py-12">
            <p>A log of all admin activities will be displayed here.</p>
        </CardContent>
        <CardFooter>
            <Button variant="outline">Export Logs</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function IntegrationsContent() {
    const { toast } = useToast();

    const handleSaveIntegrations = () => {
        toast({
            title: "Integrations Saved",
            description: "Your external service configurations have been updated.",
        });
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Connect CuraAI with external services.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Firebase Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Firebase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firebase-project-id">Project ID</Label>
              <Input id="firebase-project-id" defaultValue="curaai-prod-12345" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firebase-api-key">API Key</Label>
              <Input id="firebase-api-key" type="password" defaultValue="****************" />
            </div>
            <Button variant="outline">Test Connection</Button>
          </CardContent>
        </Card>

        {/* Gemini AI Section */}
        <Card>
           <CardHeader>
            <CardTitle className="text-xl">Gemini AI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="gemini-api-key">API Key</Label>
              <Input id="gemini-api-key" type="password" defaultValue="****************" />
            </div>
            <Button variant="outline">Test Inference</Button>
          </CardContent>
        </Card>

        {/* Stripe Section */}
        <Card>
           <CardHeader>
            <CardTitle className="text-xl">Stripe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stripe-publishable-key">Publishable Key</Label>
              <Input id="stripe-publishable-key" defaultValue="pk_test_************************" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stripe-secret-key">Secret Key</Label>
              <Input id="stripe-secret-key" type="password" defaultValue="****************" />
            </div>
            <Button variant="outline">Test Connection</Button>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button onClick={handleSaveIntegrations}>
            <Save className="mr-2" />
            Save Integrations
        </Button>
      </CardFooter>
    </Card>
  );
}

function NotificationsContent() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Preferences Saved",
      description: "Your notification settings have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Choose how you want to be notified about system activity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="report-flagged" className="font-medium">
              Report Flagged for Review
            </Label>
            <p className="text-sm text-muted-foreground">
              Get an email when a report has low confidence or is flagged by a user.
            </p>
          </div>
          <Switch id="report-flagged" defaultChecked />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="new-user" className="font-medium">
              New User Signup
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive a notification for every new user that signs up.
            </p>
          </div>
          <Switch id="new-user" defaultChecked />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="billing-alerts" className="font-medium">
              Billing Alerts
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications for invoices, payments, and subscription changes.
            </p>
          </div>
          <Switch id="billing-alerts" defaultChecked />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button onClick={handleSave}>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
}

function LegalContent() {
  const { toast } = useToast();

  const handlePublish = () => {
    toast({
      title: "Legal Policies Published",
      description: "Your Terms of Service and Privacy Policy have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal & Compliance</CardTitle>
        <CardDescription>
          Manage all public-facing policies like Terms of Service and Privacy Policy.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="terms-of-service">Terms of Service</Label>
          <Textarea
            id="terms-of-service"
            placeholder="Enter your Terms of Service text here..."
            className="min-h-48"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="privacy-policy">Privacy Policy</Label>
          <Textarea
            id="privacy-policy"
            placeholder="Enter your Privacy Policy text here..."
            className="min-h-48"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="gdpr-compliance" />
          <Label htmlFor="gdpr-compliance">Enable GDPR compliance features</Label>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button onClick={handlePublish}>Publish Changes</Button>
      </CardFooter>
    </Card>
  );
}

export default function AdminSystemPage() {
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your general settings have been updated.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, integrations, and general settings.
        </p>
      </div>

      <Tabs defaultValue="admins" orientation="vertical" className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <TabsList className="md:col-span-1 flex-col items-stretch h-full bg-transparent p-0 gap-1">
            <TabsTrigger value="general" className="w-full justify-start gap-2 data-[state=active]:bg-muted data-[state=active]:font-semibold data-[state=active]:text-primary py-2 px-3">
                <Settings className="h-4 w-4" /> General
            </TabsTrigger>
            <TabsTrigger value="admins" className="w-full justify-start gap-2 data-[state=active]:bg-muted data-[state=active]:font-semibold data-[state=active]:text-primary py-2 px-3">
                <Users className="h-4 w-4" /> Admins &amp; Roles
            </TabsTrigger>
            <TabsTrigger value="integrations" className="w-full justify-start gap-2 data-[state=active]:bg-muted data-[state=active]:font-semibold data-[state=active]:text-primary py-2 px-3">
                <LinkIcon className="h-4 w-4" /> Integrations
            </TabsTrigger>
            <TabsTrigger value="notifications" className="w-full justify-start gap-2 data-[state=active]:bg-muted data-[state=active]:font-semibold data-[state=active]:text-primary py-2 px-3">
                <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="legal" className="w-full justify-start gap-2 data-[state=active]:bg-muted data-[state=active]:font-semibold data-[state=active]:text-primary py-2 px-3">
                <FileText className="h-4 w-4" /> Legal
            </TabsTrigger>
        </TabsList>

        <div className="md:col-span-4">
            <TabsContent value="general" className="mt-0">
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>Core app-level configurations and branding basics.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* App Identity */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">App Identity</h3>
                            <div className="space-y-2">
                                <Label htmlFor="app-name">App Name</Label>
                                <Input id="app-name" defaultValue="CuraAI — Your Medical AI Companion" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-name">Company Name</Label>
                                <Input id="company-name" defaultValue="Gepard Techs &amp; Sultan Pharma" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contact-email">Contact Email</Label>
                                <Input id="contact-email" type="email" defaultValue="support@curaai.com" />
                            </div>
                        </div>

                        {/* Localization */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Localization</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="language">Default Language</Label>
                                    <Select defaultValue="en">
                                        <SelectTrigger id="language"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select defaultValue="utc">
                                        <SelectTrigger id="timezone"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc">UTC</SelectItem>
                                            <SelectItem value="est">EST</SelectItem>
                                            <SelectItem value="pst">PST</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Theme & Appearance */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Theme &amp; Appearance</h3>
                            <div className="space-y-2">
                                <Label>Default Theme</Label>
                                <Tabs defaultValue="light" className="w-auto">
                                    <TabsList>
                                        <TabsTrigger value="light" className="gap-2"><Sun /> Light</TabsTrigger>
                                        <TabsTrigger value="dark" className="gap-2"><Moon /> Dark</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                            <div className="space-y-2">
                                <Label>Primary Color</Label>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: 'hsl(220, 91%, 49%)' }}></div>
                                    <Input defaultValue="#0B61F4" className="w-32" />
                                </div>
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="border-t pt-6">
                        <Button onClick={handleSaveChanges}>
                            <Save className="mr-2" />
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="admins" className="mt-0">
                <AdminsAndRolesContent />
            </TabsContent>
            <TabsContent value="integrations" className="mt-0">
                <IntegrationsContent />
            </TabsContent>
            <TabsContent value="notifications" className="mt-0">
                <NotificationsContent />
            </TabsContent>
            <TabsContent value="legal" className="mt-0">
                <LegalContent />
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
