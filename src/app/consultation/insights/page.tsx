
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export default function HealthInsightsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart2 /> Health Insights</CardTitle>
                <CardDescription>This section is under construction.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This page will contain the health insights feature.</p>
            </CardContent>
        </Card>
    )
}
