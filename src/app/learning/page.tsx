'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Loader2,
  Sparkles,
  BookOpen,
  PencilRuler,
  SearchCheck,
  ClipboardCheck,
  Lock,
  FileText,
  X,
  Target,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useDemoLimiter } from '@/hooks/use-demo-limiter';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';

import { normalLearning } from '@/ai/flows/normal-learning';
import { conceptBuilder } from '@/ai/flows/concept-builder';
import { examMode } from '@/ai/flows/exam-mode';
import { mistakeFinder } from '@/ai/flows/mistake-finder';
import { documentQuestionAnswering } from '@/ai/flows/document-question-answering';

type LearningMode =
  | 'Normal Learning'
  | 'Concept Builder'
  | 'Exam Mode'
  | 'Mistake Finder';

const modes = [
  { value: 'Normal Learning', label: 'Normal Learning', icon: BookOpen, pro: false, },
  { value: 'Concept Builder', label: 'Concept Builder', icon: PencilRuler, pro: true, },
  { value: 'Exam Mode', label: 'Exam Mode', icon: ClipboardCheck, pro: true, },
  { value: 'Mistake Finder', label: 'Mistake Finder', icon: SearchCheck, pro: true, },
];

type Difficulty = 'Easy' | 'Medium' | 'Hard';

type ExamQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type UserAnswer = {
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
};

const LockedContent = () => (
     <div className="relative mt-4 rounded-lg border p-4 text-center">
        <div className="blur-sm select-none">
            <p className="text-muted-foreground">This is a premium feature. Full analysis is available with a free account.</p>
            <p className="text-muted-foreground mt-2">More content is blurred...</p>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-lg">
            <Lock className="h-8 w-8 text-muted-foreground" />
            <p className="mt-2 font-semibold">Unlock Full Analysis</p>
            <Button asChild size="sm" className="mt-4">
                <Link href="/signup">Create a Free Account</Link>
            </Button>
        </div>
    </div>
)

export default function LearningPage() {
  const router = useRouter();
  const { isLimitReached, incrementUsage, isGuest, isReady } = useDemoLimiter();
  const { toast } = useToast();

  const [mode, setMode] = useState<LearningMode>('Normal Learning');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (isReady && !isGuest) {
      router.push('/dashboard/learn');
    }
  }, [router, isReady, isGuest]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const resetFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() && !file) return;

    if (isGuest && isLimitReached) {
        setShowLimitModal(true);
        return;
    }

    setIsLoading(true);
    setError('');
    setAnswer(null);

    if (isGuest) {
        incrementUsage();
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    try {
        if (file && preview) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async (event) => {
                const response = await documentQuestionAnswering({ question, documentContext: event.target?.result as string });
                setAnswer(response);
                setIsLoading(false);
            };
        } else {
            if (mode !== 'Normal Learning') {
                toast({
                    title: 'Premium Feature',
                    description: 'This learning mode is available on our free plan. Please sign up to continue.',
                    variant: 'destructive',
                });
                setIsLoading(false);
                return;
            }
            const response = await normalLearning({ question });
            setAnswer(response);
            setIsLoading(false);
        }
    } catch (err) {
      console.error('Error asking question:', err);
      setError("Sorry, I couldn't process your question. Please try again.");
      setIsLoading(false);
    }
  };
  
    const renderResults = () => {
    if (!answer) return null;

    if (file) {
      return (
        <>
          <Accordion type="multiple" defaultValue={['item-0']} className="w-full">
              <AccordionItem value="item-0"><AccordionTrigger>Topic Overview</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.topicOverview}</AccordionContent></AccordionItem>
          </Accordion>
          <LockedContent />
        </>
      );
    }

    if (mode === 'Normal Learning') {
      return (
        <Accordion type="multiple" defaultValue={['item-0', 'item-1']} className="w-full">
            <AccordionItem value="item-0"><AccordionTrigger>Definition</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.definition}</AccordionContent></AccordionItem>
            <AccordionItem value="item-1"><AccordionTrigger>Use in Body</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.useInBody}</AccordionContent></AccordionItem>
            <AccordionItem value="item-2"><AccordionTrigger>Short Explanation</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.shortExplanation}</AccordionContent></AccordionItem>
        </Accordion>
      );
    }
    
    // Other modes are premium and blocked for guest users
    return null;
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
       <AlertDialog open={showLimitModal} onOpenChange={setShowLimitModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You've reached today's demo limit</AlertDialogTitle>
            <AlertDialogDescription>
              Create a free account to continue using our features, save your history, and get faster responses.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Maybe Later</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push('/signup')}>Sign Up Free</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          AI Medical Teacher
        </h1>
        <p className="max-w-[800px] text-muted-foreground md:text-xl mt-4">
          Go beyond simple answers. Build deep medical knowledge with an AI that
          teaches, tests, and helps you think like a doctor.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Start a New Learning Session {isGuest && <Badge variant="outline">Demo Mode</Badge>}</CardTitle>
              <CardDescription>
                Choose a mode and ask a medical question.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAskQuestion} className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="question-area" className="font-semibold">
                      Your Question / Topic
                    </Label>
                    <Textarea
                      id="question-area"
                      placeholder="e.g., Explain the mechanism of action of Metformin"
                      className="min-h-[120px] text-base"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                <div className="space-y-2">
                    <Label htmlFor="file-upload" className="font-semibold">Upload File (Optional)</Label>
                    <p className="text-xs text-muted-foreground">Attach an image or document. The AI will answer based on the file content.</p>
                    <div className="flex items-center gap-2">
                        <Input
                          id="file-upload"
                          type="file"
                          onChange={handleFileChange}
                          className="w-full cursor-pointer file:text-primary file:font-semibold"
                          disabled={isLoading}
                        />
                        {preview && (
                          <Button variant="ghost" size="icon" onClick={resetFile} disabled={isLoading}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                    </div>
                    {preview && (
                        <div className="mt-2 p-2 border rounded-lg max-w-fit bg-secondary/50">
                            <Image src={preview} alt="File preview" width={80} height={80} className="rounded-md object-cover aspect-square" />
                        </div>
                    )}
                </div>

                <div className={file ? 'opacity-50 pointer-events-none' : ''}>
                  <Label className="font-semibold">Learning Mode</Label>
                  <Tabs
                    value={mode}
                    onValueChange={(value) => setMode(value as LearningMode)}
                    className="w-full mt-2"
                  >
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
                      {modes.map((m) => (
                        <TabsTrigger
                          key={m.value}
                          value={m.value}
                          className="flex flex-col h-auto p-2 gap-1 text-xs"
                          disabled={m.pro}
                        >
                          <m.icon className="h-4 w-4" />
                          <span>{m.label}</span>
                          {m.pro && <Badge variant="destructive" className="text-[9px] px-1 py-0 leading-none">Premium</Badge>}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
                
                <Button
                  type="submit"
                  className="w-full !mt-6"
                  disabled={isLoading || (!question.trim() && !file)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Start Learning'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="flex flex-col min-h-[600px] relative">
           {isGuest && answer && <Badge variant="outline" className="absolute top-4 right-4 z-10">CuraAI Demo</Badge>}
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Generated Response
            </CardTitle>
            <CardDescription>
              Your structured answer will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 -mx-6">
              <div className="px-6 h-full">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Preparing your learning module...</p>
                  </div>
                )}
                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {answer && !isLoading && (
                  <div className="animate-in fade-in space-y-2">
                    {renderResults()}
                  </div>
                )}
                {!answer && !isLoading && !error && (
                  <div className="text-center text-muted-foreground h-full flex flex-col justify-center items-center p-8 border-2 border-dashed rounded-lg">
                    <p className="text-lg font-medium">Your AI Medical Teacher is ready.</p>
                    <p className="mt-2 text-sm">Ask a question or upload a file to begin.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
