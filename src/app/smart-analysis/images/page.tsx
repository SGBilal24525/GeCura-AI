
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

export default function ImageAnalysisPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ImageIcon /> Image Analysis</CardTitle>
                <CardDescription>This section is under construction.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This page will contain the image analysis feature.</p>
            </CardContent>
        </Card>
    )
}
