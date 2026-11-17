import { Suspense } from 'react';
import DashboardClientLayout from './client-layout';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin" /></div>}>
      <DashboardClientLayout>{children}</DashboardClientLayout>
    </Suspense>
  );
}
