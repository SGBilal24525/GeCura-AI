
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LayoutList } from "lucide-react";

export default function TopicsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><LayoutList /> Topics</CardTitle>
                <CardDescription>This section is under construction.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This page will contain the topics feature.</p>
            </CardContent>
        </Card>
    )
}
