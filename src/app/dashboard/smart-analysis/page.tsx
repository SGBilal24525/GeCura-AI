'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Loader2,
  Upload,
  FileQuestion,
  Pill,
  X,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import Image from 'next/image';
import {
  analyzeMedicalQuestionImage,
  AnalyzeMedicalQuestionImageOutput,
} from '@/ai/flows/analyze-medical-question-images';
import {
  analyzeMedicineBoxImage,
  AnalyzeMedicineBoxImageOutput,
} from '@/ai/flows/image-based-medical-analysis';
import {
    structuredTextOutput,
    StructuredTextOutputOutput,
} from '@/ai/flows/structured-text-output';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type AnalysisResult = {
  questionAnalysis?: AnalyzeMedicalQuestionImageOutput;
  medicineAnalysis?: AnalyzeMedicineBoxImageOutput;
  textAnalysis?: StructuredTextOutputOutput;
};

export default function SmartAnalysisPage() {
  const [activeTab, setActiveTab] = useState('question');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [rawText, setRawText] = useState('');
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
    if (
      (activeTab === 'question' && !file) ||
      (activeTab === 'medicine' && !file) ||
      (activeTab === 'text' && !rawText.trim())
    ) {
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      if (activeTab === 'text') {
        const response = await structuredTextOutput({ rawText });
        setResult({ textAnalysis: response });
        setIsLoading(false);
      } else if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64Data = reader.result as string;
          try {
            if (activeTab === 'question') {
              const response = await analyzeMedicalQuestionImage({ questionImage: base64Data });
              if (!response.isMedicalQuestion) {
                setError(response.validationMessage || "The uploaded image does not appear to be a medical question.");
              } else {
                setResult({ questionAnalysis: response });
              }
            } else if (activeTab === 'medicine') {
              const response = await analyzeMedicineBoxImage({ medicineBoxPhotoDataUri: base64Data });
              if (!response.isMedicineBox) {
                setError(response.validationMessage || "This does not appear to be a medicine box.");
              } else {
                setResult({ medicineAnalysis: response });
              }
            }
          } catch (err) {
            console.error('Analysis failed:', err);
            setError("Sorry, I couldn't analyze the image. Please try another one.");
          } finally {
            setIsLoading(false);
          }
        };
        reader.onerror = () => {
          setError("Failed to read the file.");
          setIsLoading(false);
        };
      }
    } catch (err) {
      console.error('Outer analysis failed:', err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError('');
    setRawText('');
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Smart Answer
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Upload an image or paste text for instant, AI-powered insights and structured explanations.
        </p>
      </div>
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          resetState();
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="question">Question Intelligence</TabsTrigger>
          <TabsTrigger value="medicine">Medicine Intelligence</TabsTrigger>
          <TabsTrigger value="text">Text Structuring</TabsTrigger>
        </TabsList>
        
        <TabsContent value="question" className="mt-8">
          <ImageAnalysisPanel
            title="Question Image Intelligence"
            description="Upload a photo of a handwritten or printed medical question."
            icon={<FileQuestion />}
            handleFileChange={handleFileChange}
            handleAnalysis={handleAnalysis}
            resetState={resetState}
            preview={preview}
            isLoading={isLoading}
            result={result}
            error={error}
            activeTab="question"
          />
        </TabsContent>
        <TabsContent value="medicine" className="mt-8">
          <ImageAnalysisPanel
            title="Medicine Image Intelligence"
            description="Upload a photo of a medicine box to identify its details."
            icon={<Pill />}
            handleFileChange={handleFileChange}
            handleAnalysis={handleAnalysis}
            resetState={resetState}
            preview={preview}
            isLoading={isLoading}
            result={result}
            error={error}
            activeTab="medicine"
          />
        </TabsContent>
        <TabsContent value="text" className="mt-8">
          <TextAnalysisPanel 
            handleAnalysis={handleAnalysis}
            isLoading={isLoading}
            result={result}
            error={error}
            rawText={rawText}
            setRawText={setRawText}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}


function ImageAnalysisPanel({ title, description, icon, handleFileChange, handleAnalysis, resetState, preview, isLoading, result, error, activeTab }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon} {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
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
                id={`file-upload-${activeTab}`}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video w-full max-w-sm mx-auto overflow-hidden rounded-lg border">
                <Image
                  src={preview}
                  alt="Image preview"
                  fill
                  style={{ objectFit: 'contain' }}
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
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing...</>
                ) : ( 'Analyze Image' )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="min-h-full">
        <CardHeader>
          <CardTitle>Analysis Result</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
          <AnalysisResultDisplay result={result} />
        </CardContent>
      </Card>
    </div>
  );
}

function TextAnalysisPanel({ handleAnalysis, isLoading, result, error, rawText, setRawText }: any) {
    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText /> Text Structuring Engine
                    </CardTitle>
                    <CardDescription>Paste raw medical text to have it professionally structured.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea 
                        placeholder="Paste your unstructured notes, case reports, or any medical text here..."
                        className="min-h-[250px] text-base"
                        value={rawText}
                        onChange={(e) => setRawText(e.target.value)}
                        disabled={isLoading}
                    />
                    <Button onClick={handleAnalysis} disabled={isLoading || !rawText.trim()} className="w-full">
                        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Structuring...</> : 'Structure Text'}
                    </Button>
                </CardContent>
            </Card>
             <Card className="min-h-full">
                <CardHeader>
                  <CardTitle>Analysis Result</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading && (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  )}
                  {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
                  <AnalysisResultDisplay result={result} />
                </CardContent>
              </Card>
        </div>
    )
}

function AnalysisResultDisplay({ result }: { result: AnalysisResult | null }) {
    if (!result) return (
        <div className="text-center text-muted-foreground h-full flex flex-col justify-center items-center p-8 border-2 border-dashed rounded-lg">
            <p className="text-lg font-medium">Analysis results will appear here.</p>
            <p className="mt-2 text-sm">Provide an input to get started.</p>
        </div>
    );
    
    if (result.questionAnalysis) {
        const res = result.questionAnalysis;
        return (
            <Accordion type="multiple" defaultValue={['item-0']} className="w-full animate-in fade-in">
              <AccordionItem value="item-0"><AccordionTrigger>Detected Question</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.detectedQuestion}</AccordionContent></AccordionItem>
              <AccordionItem value="item-1"><AccordionTrigger>Easy Explanation</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.easyExplanation}</AccordionContent></AccordionItem>
              <AccordionItem value="item-2"><AccordionTrigger>Medical Explanation</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.medicalExplanation}</AccordionContent></AccordionItem>
              <AccordionItem value="item-3"><AccordionTrigger>Step-by-Step Breakdown</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.stepByStepBreakdown}</AccordionContent></AccordionItem>
              {res.chemicalScientificDetails && <AccordionItem value="item-4"><AccordionTrigger>Chemical / Scientific Details</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.chemicalScientificDetails}</AccordionContent></AccordionItem>}
              <AccordionItem value="item-5"><AccordionTrigger>Exam-Ready Notes</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.examReadyNotes}</AccordionContent></AccordionItem>
            </Accordion>
        );
    }

    if (result.medicineAnalysis) {
        const res = result.medicineAnalysis;
        return (
            <div className="animate-in fade-in">
              <Accordion type="multiple" defaultValue={['item-0']} className="w-full">
                <AccordionItem value="item-0"><AccordionTrigger>Medicine Identity</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.medicineIdentity}</AccordionContent></AccordionItem>
                <AccordionItem value="item-1"><AccordionTrigger>Active Ingredients</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.activeIngredients}</AccordionContent></AccordionItem>
                <AccordionItem value="item-2"><AccordionTrigger>Medical Usage</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.medicalUsage}</AccordionContent></AccordionItem>
                <AccordionItem value="item-3"><AccordionTrigger>Mechanism of Action</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.mechanismOfAction}</AccordionContent></AccordionItem>
                <AccordionItem value="item-4"><AccordionTrigger>Dosage Guidance</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.dosageGuidance}</AccordionContent></AccordionItem>
                <AccordionItem value="item-5"><AccordionTrigger>Side Effects & Precautions</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.sideEffectsAndPrecautions}</AccordionContent></AccordionItem>
                <AccordionItem value="item-6"><AccordionTrigger>Educational Notes</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{res.educationalNotes}</AccordionContent></AccordionItem>
              </Accordion>
              <Alert variant="destructive" className="mt-6"><AlertTriangle className="h-4 w-4" /><AlertTitle>Disclaimer</AlertTitle><AlertDescription>This information is for educational purposes only. Always consult a qualified healthcare professional before taking any medicine.</AlertDescription></Alert>
            </div>
        );
    }

    if (result.textAnalysis) {
        const res = result.textAnalysis;
        return (
             <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap animate-in fade-in p-1" dangerouslySetInnerHTML={{ __html: res.structuredText.replace(/\n/g, '<br />') }}>
            </div>
        )
    }

    return null;
}
