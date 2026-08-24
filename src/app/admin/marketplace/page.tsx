'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Users,
  Package,
  AlertTriangle,
  ListChecks,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Trash2,
  ShieldCheck,
  Building,
  Store,
  Tag,
  Flag,
  FileText,
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';


// Mock Data
const initialSellers = [
    { id: 'sel_1', name: 'Sultan Pharma', businessType: 'Pharma', verificationStatus: 'Verified' as const, activeProducts: 2, joinedDate: '2024-06-01' },
    { id: 'sel_2', name: 'Gepard Tech Medical', businessType: 'Medical Devices', verificationStatus: 'Pending' as const, activeProducts: 0, joinedDate: '2024-07-15' },
    { id: 'sel_3', name: 'Healthy Living Inc.', businessType: 'Supplements', verificationStatus: 'Verified' as const, activeProducts: 1, joinedDate: '2024-05-20' },
    { id: 'sel_4', name: 'MediTools Co.', businessType: 'Surgical Instruments', verificationStatus: 'Rejected' as const, activeProducts: 0, joinedDate: '2024-07-01' },
];

const initialProducts = [
    { id: 'prod_1', name: 'Amoxicillin 500mg Capsules', category: 'Oral Medicines', seller: 'Sultan Pharma', status: 'Approved' as const, price: '$25.99' },
    { id: 'prod_2', name: 'Professional Stethoscope', category: 'Medical Devices', seller: 'MediTools Co.', status: 'Pending' as const, price: '$89.99' },
    { id: 'prod_3', name: 'Vitamin D3 5000 IU', category: 'Supplements', seller: 'Healthy Living Inc.', status: 'Approved' as const, price: '$15.00' },
    { id: 'prod_4', name: 'Nitrile Examination Gloves', category: 'Consumables', seller: 'Sultan Pharma', status: 'Rejected' as const, price: '$12.75' },
];

const initialCategories = [
    { id: 'cat_1', name: 'Oral Medicines', productCount: 15, isEnabled: true },
    { id: 'cat_2', name: 'Medical Devices', productCount: 8, isEnabled: true },
    { id: 'cat_3', name: 'Supplements', productCount: 22, isEnabled: false },
    { id: 'cat_4', name: 'Consumables', productCount: 45, isEnabled: true },
];

const initialReports = [
    { id: 'rep_1', type: 'Misleading Claim', item: 'Product: "Miracle Cure"', reason: 'User reported that the product claims to cure diseases.', reporter: 'user@example.com', status: 'Open' as const },
    { id: 'rep_2', type: 'Suspicious Seller', item: 'Seller: "QuickMeds"', reason: 'Seller is unresponsive and has negative reviews.', reporter: 'System Flag', status: 'In Review' as const },
    { id: 'rep_3', type: 'Prohibited Item', item: 'Product: "Growth Hormone"', reason: 'Product is a prescription-only item sold directly.', reporter: 'user2@example.com', status: 'Resolved' as const },
];

type Seller = typeof initialSellers[0];
type Product = typeof initialProducts[0];
type Category = typeof initialCategories[0];
type Report = typeof initialReports[0];

function ConfirmationDialog({ title, description, isOpen, onOpenChange, onConfirm, confirmText = 'Confirm', confirmVariant = 'default' }: { title: string; description: string; isOpen: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void; confirmText?: string; confirmVariant?: 'default' | 'destructive' }) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className={buttonVariants({ variant: confirmVariant })}>{confirmText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function ViewSellerDialog({ seller, isOpen, onOpenChange }: { seller: Seller | null; isOpen: boolean; onOpenChange: (open: boolean) => void; }) {
    if (!seller) return null;

    const verificationStatusStyles = {
        Verified: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        Suspended: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Seller Profile</DialogTitle>
                    <DialogDescription>Details for {seller.name}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <p><span className="font-semibold">Business Type:</span> {seller.businessType}</p>
                        <p><span className="font-semibold">Joined:</span> {format(new Date(seller.joinedDate), 'PPP')}</p>
                        <p className="flex items-center gap-2"><span className="font-semibold">Status:</span> <Badge className={cn('font-normal', verificationStatusStyles[seller.verificationStatus as keyof typeof verificationStatusStyles])}>{seller.verificationStatus}</Badge></p>
                     </div>
                    <Separator />
                    <div className="space-y-2">
                        <h4 className="font-semibold">Key Metrics</h4>
                        <p className="text-sm"><span className="font-medium">Active Products:</span> {seller.activeProducts}</p>
                        <p className="text-sm"><span className="font-medium">Total Sales:</span> $5,430.00</p>
                    </div>
                     <Separator />
                    <div className="space-y-2">
                        <h4 className="font-semibold">Uploaded Documents</h4>
                        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4" />
                            Business_License.pdf
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Reusable components for each tab
function SellersTab({ sellers, setSellers }: { sellers: Seller[]; setSellers: React.Dispatch<React.SetStateAction<Seller[]>> }) {
  const { toast } = useToast();
  const [selectedSeller, setSelectedSeller] = React.useState<Seller | null>(null);
  const [dialogState, setDialogState] = React.useState({ verify: false, reject: false, suspend: false, view: false });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  const filteredSellers = React.useMemo(() => {
    return sellers
      .filter(s => statusFilter === 'all' || s.verificationStatus.toLowerCase() === statusFilter)
      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [sellers, searchTerm, statusFilter]);

  const openDialog = (dialog: keyof typeof dialogState, seller: Seller) => {
    setSelectedSeller(seller);
    setDialogState(prev => ({ ...prev, [dialog]: true }));
  };

  const closeDialog = (dialog: keyof typeof dialogState) => {
    setDialogState(prev => ({ ...prev, [dialog]: false }));
    setSelectedSeller(null);
  };
  
  const handleUpdateStatus = (status: 'Verified' | 'Rejected' | 'Suspended') => {
      if (!selectedSeller) return;
      setSellers(prev => prev.map(s => s.id === selectedSeller.id ? { ...s, verificationStatus: status } : s));
      toast({ title: `Seller ${status}`, description: `${selectedSeller.name} has been ${status.toLowerCase()}.` });
      setDialogState({ verify: false, reject: false, suspend: false, view: false });
      setSelectedSeller(null);
  }

  const verificationStatusStyles = {
    Verified: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    Suspended: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
  };

  return (
    <>
    <ViewSellerDialog seller={selectedSeller} isOpen={dialogState.view} onOpenChange={() => closeDialog('view')} />
    <ConfirmationDialog title="Verify Seller?" description={`Are you sure you want to verify ${selectedSeller?.name}?`} isOpen={dialogState.verify} onOpenChange={() => closeDialog('verify')} onConfirm={() => handleUpdateStatus('Verified')} confirmText="Verify" />
    <ConfirmationDialog title="Reject Seller?" description={`Are you sure you want to reject ${selectedSeller?.name}?`} isOpen={dialogState.reject} onOpenChange={() => closeDialog('reject')} onConfirm={() => handleUpdateStatus('Rejected')} confirmText="Reject" confirmVariant="destructive" />
    <ConfirmationDialog title="Suspend Seller?" description={`Are you sure you want to suspend ${selectedSeller?.name}?`} isOpen={dialogState.suspend} onOpenChange={() => closeDialog('suspend')} onConfirm={() => handleUpdateStatus('Suspended' as any)} confirmText="Suspend" confirmVariant="destructive" />
    
    <Card>
      <CardHeader>
        <CardTitle>Sellers</CardTitle>
        <CardDescription>Verify, manage, and monitor all sellers on the marketplace.</CardDescription>
        <div className="flex items-center gap-2 pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by seller name..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Seller</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Active Products</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSellers.map((seller) => (
              <TableRow key={seller.id}>
                <TableCell className="font-medium">{seller.name}</TableCell>
                <TableCell>{seller.businessType}</TableCell>
                <TableCell>
                  <Badge className={cn('font-normal', verificationStatusStyles[seller.verificationStatus as keyof typeof verificationStatusStyles])}>
                    {seller.verificationStatus}
                  </Badge>
                </TableCell>
                <TableCell>{seller.activeProducts}</TableCell>
                <TableCell>{format(new Date(seller.joinedDate), 'PPP')}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu open={openMenuId === seller.id} onOpenChange={(isOpen) => setOpenMenuId(isOpen ? seller.id : null)}>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => openDialog('view', seller)}>View Profile</DropdownMenuItem>
                      {seller.verificationStatus === 'Pending' && <DropdownMenuItem onSelect={() => openDialog('verify', seller)}>Verify</DropdownMenuItem>}
                       {seller.verificationStatus === 'Pending' && <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={() => openDialog('reject', seller)}>Reject</DropdownMenuItem>}
                      {seller.verificationStatus === 'Verified' && <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={() => openDialog('suspend', seller)}>Suspend Seller</DropdownMenuItem>}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </>
  );
}

function ProductsTab({ products, setProducts }: { products: Product[], setProducts: React.Dispatch<React.SetStateAction<Product[]>> }) {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('all');
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
    const [isRemoveOpen, setIsRemoveOpen] = React.useState(false);
    const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

    const filteredProducts = React.useMemo(() => {
        return products
            .filter(p => statusFilter === 'all' || p.status.toLowerCase() === statusFilter)
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm, statusFilter]);

    const handleUpdateStatus = (product: Product, status: 'Approved' | 'Rejected') => {
        setProducts(prev => prev.map(p => p.id === product.id ? {...p, status} : p));
        toast({ title: `Product ${status}`, description: `"${product.name}" has been ${status.toLowerCase()}.`});
    }

    const openRemoveDialog = (product: Product) => {
        setSelectedProduct(product);
        setIsRemoveOpen(true);
    }
    
    const handleRemoveConfirm = () => {
        if (!selectedProduct) return;
        setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
        toast({ title: "Product Removed", description: `"${selectedProduct.name}" has been removed.`, variant: 'destructive'});
        setIsRemoveOpen(false);
        setSelectedProduct(null);
    }

     const statusStyles = {
        Approved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    };

    return (
        <>
        <ConfirmationDialog title="Remove Product?" description={`Are you sure you want to permanently remove "${selectedProduct?.name}"?`} isOpen={isRemoveOpen} onOpenChange={setIsRemoveOpen} onConfirm={handleRemoveConfirm} confirmText="Remove" confirmVariant="destructive" />
        <Card>
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>Approve, reject, and manage all products listed on the marketplace.</CardDescription>
                <div className="flex items-center gap-2 pt-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by product name..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Seller</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.seller}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <Badge className={cn('font-normal', statusStyles[product.status])}>
                                        {product.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu open={openMenuId === product.id} onOpenChange={(isOpen) => setOpenMenuId(isOpen ? product.id : null)}>
                                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {product.status === 'Pending' && <DropdownMenuItem onSelect={() => handleUpdateStatus(product, 'Approved')}>Approve</DropdownMenuItem>}
                                            {product.status === 'Pending' && <DropdownMenuItem onSelect={() => handleUpdateStatus(product, 'Rejected')}>Reject</DropdownMenuItem>}
                                            <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={() => openRemoveDialog(product)}>Remove</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        </>
    )
}

function AddEditCategoryDialog({ isOpen, onOpenChange, category, onSave }: { isOpen: boolean, onOpenChange: (open: boolean) => void, category: Category | null, onSave: (data: any) => void }) {
    const [name, setName] = React.useState('');

    React.useEffect(() => {
        if (isOpen) {
            setName(category?.name || '');
        }
    }, [isOpen, category]);

    const handleSave = () => {
        onSave({ ...category, name });
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="category-name">Category Name</Label>
                    <Input id="category-name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function CategoriesTab({ categories, setCategories }: { categories: Category[], setCategories: React.Dispatch<React.SetStateAction<Category[]>> }) {
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
    const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

    const openDialog = (category: Category | null = null) => {
        setSelectedCategory(category);
        setIsDialogOpen(true);
    };

    const handleSaveCategory = (data: any) => {
        if (data.id) { // Editing
            setCategories(prev => prev.map(c => c.id === data.id ? { ...c, name: data.name } : c));
            toast({ title: "Category Updated" });
        } else { // Adding
            const newCategory = { id: `cat_${Date.now()}`, name: data.name, productCount: 0, isEnabled: true };
            setCategories(prev => [...prev, newCategory]);
            toast({ title: "Category Added" });
        }
        setIsDialogOpen(false);
    };

    const handleToggle = (category: Category) => {
        setCategories(prev => prev.map(c => c.id === category.id ? { ...c, isEnabled: !c.isEnabled } : c));
        toast({ title: `Category ${category.isEnabled ? 'Disabled' : 'Enabled'}`});
    }
    
    return (
        <>
        <AddEditCategoryDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} category={selectedCategory} onSave={handleSaveCategory} />
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>Manage product categories for the marketplace.</CardDescription>
                </div>
                <Button size="sm" onClick={() => openDialog()}><PlusCircle className="mr-2 h-4 w-4" /> Add Category</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader><TableRow><TableHead>Category Name</TableHead><TableHead>Products</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {categories.map((cat) => (
                            <TableRow key={cat.id}>
                                <TableCell className="font-medium">{cat.name}</TableCell>
                                <TableCell>{cat.productCount}</TableCell>
                                <TableCell><Switch checked={cat.isEnabled} onCheckedChange={() => handleToggle(cat)} /></TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu open={openMenuId === cat.id} onOpenChange={(isOpen) => setOpenMenuId(isOpen ? cat.id : null)}>
                                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onSelect={() => openDialog(cat)}>Edit</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        </>
    );
}

function ReviewReportDialog({ report, isOpen, onOpenChange, onStatusChange }: { report: Report | null, isOpen: boolean, onOpenChange: (open: boolean) => void, onStatusChange: (status: 'In Review' | 'Resolved') => void }) {
    if (!report) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Review Report: #{report.id}</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4 text-sm">
                    <p><span className="font-semibold">Item:</span> {report.item}</p>
                    <p><span className="font-semibold">Reason:</span> {report.reason}</p>
                    <p><span className="font-semibold">Reporter:</span> {report.reporter}</p>
                    <p><span className="font-semibold">Current Status:</span> {report.status}</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button variant="secondary" onClick={() => onStatusChange('In Review')}>Mark as In Review</Button>
                    <Button onClick={() => onStatusChange('Resolved')}>Mark as Resolved</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function ReportsTab({ reports, setReports }: { reports: Report[], setReports: React.Dispatch<React.SetStateAction<Report[]>> }) {
  const [selectedReport, setSelectedReport] = React.useState<Report | null>(null);
  const { toast } = useToast();

  const handleReview = (report: Report) => {
    setSelectedReport(report);
  }

  const handleStatusChange = (status: 'In Review' | 'Resolved') => {
      if (!selectedReport) return;
      setReports(prev => prev.map(r => r.id === selectedReport.id ? {...r, status} : r));
      toast({ title: "Report Status Updated" });
      setSelectedReport(null);
  }

  const statusStyles: { [key: string]: string } = {
    Open: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    'In Review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Resolved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  };
    return (
        <>
        <ReviewReportDialog report={selectedReport} isOpen={!!selectedReport} onOpenChange={() => setSelectedReport(null)} onStatusChange={handleStatusChange} />
        <Card>
            <CardHeader>
                <CardTitle>Reports & Flags</CardTitle>
                <CardDescription>Review and resolve issues reported by users or the system.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader><TableRow><TableHead>Reported Item</TableHead><TableHead>Reason</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell>
                                    <div className="font-medium">{report.item}</div>
                                    <div className="text-sm text-muted-foreground">{report.type}</div>
                                </TableCell>
                                <TableCell className="max-w-xs truncate">{report.reason}</TableCell>
                                <TableCell>
                                    <Badge className={cn("font-normal", statusStyles[report.status])}>
                                        {report.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" onClick={() => handleReview(report)}>Review</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 </Table>
            </CardContent>
        </Card>
        </>
    );
}


// Main Page Component
export default function AdminMarketplacePage() {
    const [sellers, setSellers] = React.useState(initialSellers);
    const [products, setProducts] = React.useState(initialProducts);
    const [categories, setCategories] = React.useState(initialCategories);
    const [reports, setReports] = React.useState(initialReports);
    
    const kpiCards = [
        { title: 'Active Sellers', value: '12', icon: Store },
        { title: 'Pending Products', value: '8', icon: Clock },
        { title: 'Flagged Items', value: '3', icon: Flag },
        { title: 'Live Products', value: '1,254', icon: Package },
    ];
    
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                 <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
                        Marketplace Management
                    </h1>
                    <p className="text-muted-foreground">
                        Manage sellers, products, and medical compliance.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {kpiCards.map(card => (
                    <Card key={card.title} className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            <card.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <Tabs defaultValue="sellers" className="w-full">
                <TabsList>
                    <TabsTrigger value="sellers"><Store className="mr-2 h-4 w-4" /> Sellers</TabsTrigger>
                    <TabsTrigger value="products"><Package className="mr-2 h-4 w-4" /> Products</TabsTrigger>
                    <TabsTrigger value="categories"><Tag className="mr-2 h-4 w-4" /> Categories</TabsTrigger>
                    <TabsTrigger value="reports"><Flag className="mr-2 h-4 w-4" /> Reports / Flags</TabsTrigger>
                </TabsList>
                <TabsContent value="sellers" className="mt-6"><SellersTab sellers={sellers} setSellers={setSellers} /></TabsContent>
                <TabsContent value="products" className="mt-6"><ProductsTab products={products} setProducts={setProducts} /></TabsContent>
                <TabsContent value="categories" className="mt-6"><CategoriesTab categories={categories} setCategories={setCategories} /></TabsContent>
                <TabsContent value="reports" className="mt-6"><ReportsTab reports={reports} setReports={setReports} /></TabsContent>
            </Tabs>
        </div>
    );
}
