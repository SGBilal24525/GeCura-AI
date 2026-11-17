
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Pill } from "lucide-react";

export default function MedicineAnalysisPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Pill /> Medicine Analysis</CardTitle>
                <CardDescription>This section is under construction.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This page will contain the medicine analysis feature.</p>
            </CardContent>
        </Card>
    )
}
