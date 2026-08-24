'use client';

import * as React from 'react';
import {
  ChevronDown,
  MoreHorizontal,
  PlusCircle,
  File,
  ListFilter,
  Search,
  Calendar as CalendarIcon,
  Eye,
  Edit,
  CreditCard,
  UserX,
  Trash2,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, subDays } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock Data
const initialUsers = [
  {
    id: 'usr_1',
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    plan: 'Premium',
    status: 'Active',
    aiUsage: { queries: 120, sessions: 15 },
    lastActive: '2024-07-20T10:00:00.000Z',
  },
  {
    id: 'usr_2',
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    plan: 'Standard',
    status: 'Active',
    aiUsage: { queries: 75, sessions: 10 },
    lastActive: '2024-07-18T10:00:00.000Z',
  },
  {
    id: 'usr_3',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    plan: 'Free',
    status: 'Active',
    aiUsage: { queries: 25, sessions: 5 },
    lastActive: '2024-07-14T10:00:00.000Z',
  },
    {
    id: 'usr_4',
    name: 'William Kim',
    email: 'will.kim@email.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    plan: 'Premium',
    status: 'Suspended',
    aiUsage: { queries: 200, sessions: 25 },
    lastActive: '2024-07-07T10:00:00.000Z',
  },
    {
    id: 'usr_5',
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    plan: 'Free',
    status: 'Active',
    aiUsage: { queries: 10, sessions: 2 },
    lastActive: '2024-07-21T10:00:00.000Z',
  },
];

type User = typeof initialUsers[0];

const planStyles = {
  Premium: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Standard: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  Free: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const statusStyles = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Suspended: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
};

// Sub-components for Modals/Dialogs

function AddEditUserDialog({ user, isOpen, onOpenChange, onSave }: { user: User | null; isOpen: boolean; onOpenChange: (open: boolean) => void; onSave: (userData: Partial<User>) => void; }) {
    const [name, setName] = React.useState(user?.name || '');
    const [email, setEmail] = React.useState(user?.email || '');
    const [plan, setPlan] = React.useState(user?.plan || 'Free');
    
    React.useEffect(() => {
        if (isOpen) {
            if (user) {
                setName(user.name);
                setEmail(user.email);
                setPlan(user.plan);
            } else {
                setName('');
                setEmail('');
                setPlan('Free');
            }
        }
    }, [user, isOpen]);

    const handleSave = () => {
        onSave({ id: user?.id, name, email, plan });
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
                    <DialogDescription>{user ? 'Update the details for this user.' : 'Enter the details for the new user.'}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="plan" className="text-right">Plan</Label>
                        <Select value={plan} onValueChange={setPlan}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a plan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Free">Free</SelectItem>
                                <SelectItem value="Standard">Standard</SelectItem>
                                <SelectItem value="Premium">Premium</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function ViewUserDialog({ user, isOpen, onOpenChange }: { user: User | null; isOpen: boolean; onOpenChange: (open: boolean) => void; }) {
    if (!user) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                     <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-lg">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="font-semibold">Plan:</span> <Badge variant="secondary" className={cn('font-normal', planStyles[user.plan as keyof typeof planStyles])}>{user.plan}</Badge></div>
                        <div><span className="font-semibold">Status:</span> <Badge variant="secondary" className={cn('font-normal', statusStyles[user.status as keyof typeof statusStyles])}>{user.status}</Badge></div>
                        <div><span className="font-semibold">AI Queries:</span> {user.aiUsage.queries}</div>
                        <div><span className="font-semibold">AI Sessions:</span> {user.aiUsage.sessions}</div>
                        <div><span className="font-semibold">Last Active:</span> {format(new Date(user.lastActive), 'PPP')}</div>
                    </div>
                </div>
                <DialogFooter>
                     <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function ConfirmationDialog({ title, description, isOpen, onOpenChange, onConfirm }: { title: string; description: string; isOpen: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void; }) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className={title.includes("Delete") ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function ExportDialog({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void; }) {
    const { toast } = useToast();
    const [date, setDate] = React.useState<DateRange | undefined>();

    React.useEffect(() => {
        if (isOpen) {
            setDate({
                from: subDays(new Date(), 20),
                to: new Date(),
            });
        }
    }, [isOpen]);

    const handleExport = () => {
        toast({
            title: "Exporting Report",
            description: "A CSV file is being generated for the selected date range."
        });
        onOpenChange(false);
    }
    
    return (
         <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Export Users</DialogTitle>
                    <DialogDescription>Select a date range to export user data as a CSV file.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleExport}>Export</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Main Page Component
export default function AdminUsersPage() {
  const { toast } = useToast();

  const [users, setUsers] = React.useState<User[]>(initialUsers);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [activeTab, setActiveTab] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.useState('');
  const [planFilters, setPlanFilters] = React.useState<string[]>(['Premium', 'Standard', 'Free']);

  // Modal States
  const [modalState, setModalState] = React.useState({
    addUser: false,
    viewUser: false,
    editUser: false,
    changePlan: false,
    export: false,
    confirmSuspend: false,
    confirmDelete: false,
  });
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  
  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedRows(filteredUsers.map(u => u.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  const filteredUsers = React.useMemo(() => {
    return users
      .filter(user => { // Filter by status tab
        if (activeTab === "all") return true;
        return user.status.toLowerCase() === activeTab.toLowerCase();
      })
      .filter(user => { // Filter by plan dropdown
        return planFilters.includes(user.plan);
      })
      .filter(user => { // Filter by search term
        if (!searchTerm.trim()) return true;
        const term = searchTerm.toLowerCase();
        return user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
      });
  }, [users, activeTab, searchTerm, planFilters]);

  const handlePlanFilterChange = (plan: string) => {
    setPlanFilters(prev => 
        prev.includes(plan) ? prev.filter(p => p !== plan) : [...prev, plan]
    );
  };
  
  const openModal = (modal: keyof typeof modalState, user: User | null = null) => {
      setOpenMenuId(null); // Explicitly close the menu
      setSelectedUser(user);
      setModalState(prev => ({...prev, [modal]: true}));
  }
  
  const closeModal = (modal: keyof typeof modalState) => {
      setModalState(prev => ({...prev, [modal]: false}));
      setSelectedUser(null);
  }
  
  // Handlers for actions
  const handleSaveUser = (userData: Partial<User>) => {
      if (userData.id) { // Edit user
          setUsers(prev => prev.map(u => u.id === userData.id ? {...u, ...userData} as User : u));
          toast({ title: 'User Updated', description: `${userData.name}'s details have been updated.`});
      } else { // Add user
          const newUser: User = {
              id: `usr_${Math.random().toString(36).substr(2, 9)}`,
              name: userData.name!,
              email: userData.email!,
              plan: userData.plan!,
              avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
              status: 'Active',
              aiUsage: { queries: 0, sessions: 0},
              lastActive: new Date().toISOString(),
          };
          setUsers(prev => [newUser, ...prev]);
          toast({ title: 'User Added', description: `${newUser.name} has been added.`});
      }
      closeModal('addUser');
      closeModal('editUser');
  }

  const handleSuspendUser = () => {
    if(!selectedUser) return;
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? {...u, status: 'Suspended'} : u));
    toast({ title: 'User Suspended', description: `${selectedUser.name} has been suspended.`});
    closeModal('confirmSuspend');
  }
  
  const handleDeleteUser = () => {
    if(!selectedUser) return;
    setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
    toast({ title: 'User Deleted', description: `${selectedUser.name} has been deleted.`, variant: 'destructive'});
    closeModal('confirmDelete');
  }

  const handleChangePlan = (newPlan: string) => {
    if(!selectedUser) return;
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? {...u, plan: newPlan } : u));
    toast({ title: 'Plan Changed', description: `${selectedUser.name}'s plan has been updated to ${newPlan}.`});
    closeModal('changePlan');
  };

  return (
    <>
      {/* Dialogs and Modals */}
      <AddEditUserDialog 
        user={selectedUser} 
        isOpen={modalState.addUser || modalState.editUser}
        onOpenChange={(open) => !open && (closeModal('addUser'), closeModal('editUser'))}
        onSave={handleSaveUser}
      />
      <ViewUserDialog 
        user={selectedUser}
        isOpen={modalState.viewUser}
        onOpenChange={() => closeModal('viewUser')}
      />
      <ExportDialog isOpen={modalState.export} onOpenChange={() => closeModal('export')} />
      
       <Dialog open={modalState.changePlan} onOpenChange={() => closeModal('changePlan')}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Plan for {selectedUser?.name}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                     <Select defaultValue={selectedUser?.plan} onValueChange={handleChangePlan}>
                        <SelectTrigger><SelectValue placeholder="Select new plan" /></SelectTrigger>
                        <SelectContent>
                           <SelectItem value="Free">Free</SelectItem>
                           <SelectItem value="Standard">Standard</SelectItem>
                           <SelectItem value="Premium">Premium</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </DialogContent>
        </Dialog>
      
      <ConfirmationDialog
        title="Suspend User?"
        description={`Are you sure you want to suspend ${selectedUser?.name}? They will lose access to the platform.`}
        isOpen={modalState.confirmSuspend}
        onOpenChange={() => closeModal('confirmSuspend')}
        onConfirm={handleSuspendUser}
      />
       <ConfirmationDialog
        title="Delete User?"
        description={`This action is permanent. Are you sure you want to delete ${selectedUser?.name}?`}
        isOpen={modalState.confirmDelete}
        onOpenChange={() => closeModal('confirmDelete')}
        onConfirm={handleDeleteUser}
      />

      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
          <CardDescription>
            Manage all platform users, their plans, and activities.
          </CardDescription>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter by Plan
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Filter by plan</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked={planFilters.includes('Premium')} onCheckedChange={() => handlePlanFilterChange('Premium')}>Premium</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={planFilters.includes('Standard')} onCheckedChange={() => handlePlanFilterChange('Standard')}>Standard</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={planFilters.includes('Free')} onCheckedChange={() => handlePlanFilterChange('Free')}>Free</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-10 gap-1" onClick={() => openModal('export')}>
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                </Button>
              <Button size="sm" className="h-10 gap-1" onClick={() => openModal('addUser')}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add User</span>
              </Button>
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="pt-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="suspended">Suspended</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox 
                      checked={selectedRows.length > 0 && selectedRows.length === filteredUsers.length ? true : selectedRows.length > 0 ? 'indeterminate' : false}
                      onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead className="hidden md:table-cell">Plan</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell text-right">AI Usage</TableHead>
                <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <TableRow key={user.id} data-state={selectedRows.includes(user.id) ? 'selected' : ''}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedRows.includes(user.id)}
                      onCheckedChange={(checked) => handleSelectRow(user.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className={`font-normal ${planStyles[user.plan as keyof typeof planStyles]}`}>
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className={`font-normal ${statusStyles[user.status as keyof typeof statusStyles]}`}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-right">
                    {user.aiUsage.queries} queries
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {format(new Date(user.lastActive), 'PPP')}
                  </TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu 
                        open={openMenuId === user.id} 
                        onOpenChange={(isOpen) => setOpenMenuId(isOpen ? user.id : null)}
                      >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => openModal('viewUser', user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => openModal('editUser', user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => openModal('changePlan', user)}>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Change Plan</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => openModal('confirmSuspend', user)}>
                          <UserX className="mr-2 h-4 w-4" />
                          <span>Suspend</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={() => openModal('confirmDelete', user)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                        No results found.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            <strong>{selectedRows.length}</strong> of <strong>{filteredUsers.length}</strong> row(s) selected.
          </div>
          <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" disabled={selectedRows.length === 0}>
                      Bulk Actions
                      <ChevronDown className="h-4 w-4 ml-2"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => toast({title: "Bulk suspend not implemented"})}>Suspend Selected</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({title: "Bulk activate not implemented"})}>Activate Selected</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => toast({title: "Bulk plan change not implemented"})}>Change Plan for Selected</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => toast({title: "Bulk delete not implemented"})} className="text-destructive focus:text-destructive">Delete Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
