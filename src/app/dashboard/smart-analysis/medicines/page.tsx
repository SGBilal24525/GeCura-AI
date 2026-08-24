'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Loader2,
  Upload,
  Pill,
  X,
  AlertTriangle,
} from 'lucide-react';
import Image from 'next/image';
import {
  analyzeMedicineBoxImage,
  AnalyzeMedicineBoxImageOutput,
} from '@/ai/flows/image-based-medical-analysis';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type AnalysisResult = AnalyzeMedicineBoxImageOutput;

export default function MedicineAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
      setError('');

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAnalysis = async () => {
    if (!file) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result as string;

      try {
        const response = await analyzeMedicineBoxImage({
          medicineBoxPhotoDataUri: base64Data,
        });
        if (!response.isMedicineBox) {
            setError(response.validationMessage || "This does not appear to be a medicine box. Please upload a clear photo of the medicine packaging.");
            setResult(null);
        } else {
            setResult(response);
        }
      } catch (err) {
        console.error('Analysis failed:', err);
        setError("Sorry, I couldn't analyze the image. Please try another one.");
      } finally {
        setIsLoading(false);
      }
    };
  };

  const resetState = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError('');
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
            Medicine Box Analysis
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Upload a photo of a medicine box to identify its details.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Upload /> Upload Image
                </CardTitle>
                <CardDescription>Select an image of a medicine box to analyze.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                {!preview ? (
                    <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center h-64">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">
                        Drag & drop your image here, or click to browse
                    </p>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                        id="file-upload-medicine"
                    />
                    </div>
                ) : (
                    <div className="space-y-4">
                    <div className="relative aspect-video w-full max-w-sm mx-auto overflow-hidden rounded-lg border">
                        <Image
                        src={preview}
                        alt="Image preview"
                        fill
                        objectFit="contain"
                        />
                        <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7"
                        onClick={resetState}
                        >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove Image</span>
                        </Button>
                    </div>
                    <Button
                        onClick={handleAnalysis}
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                        </>
                        ) : (
                        'Analyze Medicine Box'
                        )}
                    </Button>
                    </div>
                )}
                </CardContent>
            </Card>

            <Card className="min-h-full">
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Pill /> Analysis Result
                </CardTitle>
                <CardDescription>The identified details will appear here.</CardDescription>
                </CardHeader>
                <CardContent>
                {isLoading && (
                    <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                {error && (
                    <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {result && (
                    <div className="animate-in fade-in">
                    <Accordion
                        type="multiple"
                        defaultValue={['item-0', 'item-1', 'item-2']}
                        className="w-full"
                    >
                        <AccordionItem value="item-0">
                        <AccordionTrigger>Medicine Identity</AccordionTrigger>
                        <AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                            {result.medicineIdentity}
                        </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-1">
                        <AccordionTrigger>Active Ingredients</AccordionTrigger>
                        <AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                            {result.activeIngredients}
                        </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                        <AccordionTrigger>Medical Usage</AccordionTrigger>
                        <AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                            {result.medicalUsage}
                        </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                        <AccordionTrigger>Mechanism of Action</AccordionTrigger>
                        <AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                            {result.mechanismOfAction}
                        </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                        <AccordionTrigger>Dosage Guidance</AccordionTrigger>
                        <AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                            {result.dosageGuidance}
                        </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                        <AccordionTrigger>Side Effects & Precautions</AccordionTrigger>
                        <AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                            {result.sideEffectsAndPrecautions}
                        </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                        <AccordionTrigger>Educational Notes</AccordionTrigger>
                        <AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                            {result.educationalNotes}
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Alert variant="destructive" className="mt-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Disclaimer</AlertTitle>
                        <AlertDescription>
                        This information is for educational purposes only. Always
                        consult a qualified healthcare professional before taking any
                        medicine.
                        </AlertDescription>
                    </Alert>
                    </div>
                )}
                {!isLoading && !result && !error && (
                    <div className="text-center text-muted-foreground h-full flex flex-col justify-center items-center p-8 border-2 border-dashed rounded-lg">
                        <p className="text-lg font-medium">Analysis results will appear here.</p>
                        <p className="mt-2 text-sm">Upload an image of a medicine box to get started.</p>
                    </div>
                )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
