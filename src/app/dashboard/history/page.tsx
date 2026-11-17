import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";

export default function HistoryPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><History /> Global History</CardTitle>
                <CardDescription>This section is under construction.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Here you will be able to view a complete history of all your interactions with the AI, including questions asked in the Learning module and images analyzed with Smart Answer.</p>
            </CardContent>
        </Card>
    )
}
