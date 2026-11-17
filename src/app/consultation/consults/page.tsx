
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function ConsultationsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare /> Consultations</CardTitle>
                <CardDescription>This section is under construction.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This page will contain the consultations feature.</p>
            </CardContent>
        </Card>
    )
}
