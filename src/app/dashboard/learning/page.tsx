'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
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
  FileText,
  X,
  Target,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
  { value: 'Normal Learning', label: 'Normal Learning', icon: BookOpen },
  { value: 'Concept Builder', label: 'Concept Builder', icon: PencilRuler },
  { value: 'Exam Mode', label: 'Exam Mode', icon: ClipboardCheck },
  { value: 'Mistake Finder', label: 'Mistake Finder', icon: SearchCheck },
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

export default function LearningPage() {
  const { toast } = useToast();
  const [mode, setMode] = useState<LearningMode>('Normal Learning');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Exam Mode State
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [examFinished, setExamFinished] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState({ title: '', description: '' });

  const resultsRef = useRef<HTMLDivElement>(null);

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
  
  const resetExamState = () => {
    setExamQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setExamFinished(false);
  }

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() && !file) return;

    setIsLoading(true);
    setError('');
    setAnswer(null);
    resetExamState();
    
    try {
      if (file && preview) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onerror = (error) => {
          console.error("Failed to read file:", error);
          setError("Failed to read the file.");
          setIsLoading(false);
        };
        reader.onload = async (event) => {
          try {
            const response = await documentQuestionAnswering({ question, documentContext: event.target?.result as string });
            setAnswer(response);
          } catch (err) {
            console.error("Error answering document question:", err);
            setError("Sorry, I couldn't process your question. Please try again.");
          } finally {
            setIsLoading(false);
          }
        };
      } else {
        let response;
        switch(mode) {
          case 'Normal Learning':
            response = await normalLearning({ question });
            setAnswer(response);
            break;
          case 'Concept Builder':
            response = await conceptBuilder({ question });
            setAnswer(response);
            break;
          case 'Mistake Finder':
            response = await mistakeFinder({ explanation: question });
            setAnswer(response);
            break;
          case 'Exam Mode':
            response = await examMode({ topic: question, difficulty });
            setExamQuestions(response.questions);
            setAnswer({__type: 'ExamMode'}); // Set a placeholder to indicate exam mode has started
            break;
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error asking question:', err);
      setError("Sorry, I couldn't process your question. Please try again.");
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  
  const handleNextQuestion = () => {
      if (!selectedOption) {
          toast({ title: "Please select an answer.", variant: "destructive" });
          return;
      }

      const currentQuestion = examQuestions[currentQuestionIndex];
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      
      setUserAnswers(prev => [...prev, {
          question: currentQuestion.question,
          selected: selectedOption,
          correct: currentQuestion.correctAnswer,
          isCorrect: isCorrect,
      }]);
      
      setFeedbackContent({
          title: isCorrect ? "Correct!" : "Incorrect",
          description: isCorrect ? "Great job! Let's move to the next question." : `The correct answer is: ${currentQuestion.correctAnswer}. ${currentQuestion.explanation}`
      });

      setShowFeedbackModal(true);
  };
  
  const proceedToNext = () => {
      setShowFeedbackModal(false);
      setSelectedOption(null);
      if (currentQuestionIndex < examQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
      } else {
          setExamFinished(true);
      }
  }
  
  const renderExamResults = () => {
      const correctCount = userAnswers.filter(a => a.isCorrect).length;
      const score = Math.round((correctCount / examQuestions.length) * 100);
      return (
          <div className="space-y-6">
              <CardTitle>Exam Result</CardTitle>
              <div className="text-center">
                  <p className="text-lg">You scored</p>
                  <p className="text-6xl font-bold text-primary">{score}%</p>
                  <p className="text-muted-foreground">({correctCount} out of {examQuestions.length} correct)</p>
              </div>
              <Button onClick={() => { setAnswer(null); resetExamState(); setQuestion(''); }}>Take Another Exam</Button>
              <Accordion type="multiple" className="w-full">
                  <AccordionItem value="review">
                      <AccordionTrigger>Review Incorrect Answers</AccordionTrigger>
                      <AccordionContent>
                          <div className="space-y-4">
                              {userAnswers.filter(a => !a.isCorrect).map((answer, index) => (
                                  <div key={index} className="p-3 border rounded-md bg-destructive/10">
                                      <p className="font-semibold">{answer.question}</p>
                                      <p className="text-sm text-red-600">Your answer: {answer.selected}</p>
                                      <p className="text-sm text-green-600">Correct answer: {answer.correct}</p>
                                  </div>
                              ))}
                              {userAnswers.filter(a => !a.isCorrect).length === 0 && <p>Great job, no incorrect answers!</p>}
                          </div>
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </div>
      )
  };

  const renderResults = () => {
    if (!answer) return null;

    if (file) {
      return (
        <Accordion type="multiple" defaultValue={['item-0', 'item-1']} className="w-full">
            <AccordionItem value="item-0"><AccordionTrigger>Topic Overview</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.topicOverview}</AccordionContent></AccordionItem>
            <AccordionItem value="item-1"><AccordionTrigger>Core Explanation</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.coreExplanation}</AccordionContent></AccordionItem>
            <AccordionItem value="item-2"><AccordionTrigger>Step-by-Step Breakdown</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.stepByStepBreakdown}</AccordionContent></AccordionItem>
            <AccordionItem value="item-3"><AccordionTrigger>Practical Understanding</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.practicalUnderstanding}</AccordionContent></AccordionItem>
        </Accordion>
      );
    }
    
    if (mode === 'Exam Mode') {
        if(examFinished) return renderExamResults();
        
        const currentQuestion = examQuestions[currentQuestionIndex];
        if (!currentQuestion) return null;

        return (
            <div className="space-y-4">
                <Progress value={((currentQuestionIndex + 1) / examQuestions.length) * 100} className="w-full" />
                <Label className="font-semibold flex items-start gap-2">
                    <Target className="h-4 w-4 mt-1 flex-shrink-0"/>
                    <div>
                        <span className="block">Question {currentQuestionIndex + 1} of {examQuestions.length}</span>
                        <p className="text-sm text-muted-foreground font-normal mt-1">{currentQuestion.question}</p>
                    </div>
                </Label>
                <RadioGroup value={selectedOption ?? ""} onValueChange={setSelectedOption} className="space-y-2 pl-6">
                    {currentQuestion.options.map((option: string, i: number) => (
                        <div key={i} className="flex items-center space-x-3 rounded-md border p-3 text-sm transition-all">
                            <RadioGroupItem value={option} id={`q${currentQuestionIndex}o${i}`} />
                            <Label htmlFor={`q${currentQuestionIndex}o${i}`} className="flex-1 cursor-pointer font-normal">{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
                <Button onClick={handleNextQuestion} className="w-full mt-4" disabled={!selectedOption}>Next</Button>
            </div>
        )
    }

    switch (mode) {
      case 'Normal Learning':
        return (
          <Accordion type="multiple" defaultValue={['item-0', 'item-1']} className="w-full">
            <AccordionItem value="item-0"><AccordionTrigger>Definition</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.definition}</AccordionContent></AccordionItem>
            <AccordionItem value="item-1"><AccordionTrigger>Use in Body</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.useInBody}</AccordionContent></AccordionItem>
            <AccordionItem value="item-2"><AccordionTrigger>Short Explanation</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.shortExplanation}</AccordionContent></AccordionItem>
          </Accordion>
        );
      case 'Concept Builder':
        return (
          <Accordion type="multiple" defaultValue={['item-0', 'item-1']} className="w-full">
            <AccordionItem value="item-0"><AccordionTrigger>1. Ultra-Simple Explanation</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.ultraSimpleExplanation}</AccordionContent></AccordionItem>
            <AccordionItem value="item-1"><AccordionTrigger>2. Proper Medical Explanation</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.properMedicalExplanation}</AccordionContent></AccordionItem>
            <AccordionItem value="item-2"><AccordionTrigger>3. Step-by-Step Concept Flow</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.stepByStepConceptFlow}</AccordionContent></AccordionItem>
            {answer.chemicalBiologicalDetails && <AccordionItem value="item-3"><AccordionTrigger>4. Chemical / Biological Details</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.chemicalBiologicalDetails}</AccordionContent></AccordionItem>}
            <AccordionItem value="item-4"><AccordionTrigger>5. Clinical Value</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.clinicalValue}</AccordionContent></AccordionItem>
          </Accordion>
        );
      case 'Mistake Finder':
        return (
          <Accordion type="multiple" defaultValue={['item-0', 'item-1']} className="w-full">
            <AccordionItem value="item-0"><AccordionTrigger>Feedback on Your Explanation</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.feedback}</AccordionContent></AccordionItem>
            <AccordionItem value="item-1"><AccordionTrigger>Corrected Explanation</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.correctedExplanation}</AccordionContent></AccordionItem>
            <AccordionItem value="item-2"><AccordionTrigger>Key Concepts to Review</AccordionTrigger><AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{answer.keyConcepts}</AccordionContent></AccordionItem>
          </Accordion>
        );
      default:
        return null;
    }
  }

  return (
    <>
    <AlertDialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{feedbackContent.title}</AlertDialogTitle>
                <AlertDialogDescription>{feedbackContent.description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction onClick={proceedToNext}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          AI Medical Teacher
        </h1>
        <p className="max-w-[800px] text-muted-foreground md:text-xl mt-4">
          Go beyond simple answers. Build deep medical knowledge with an AI that
          teaches, tests, and helps you think like a doctor.
        </p>
      </div>

      <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Start a New Learning Session</CardTitle>
            <CardDescription>
              Choose a mode and provide your input.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAskQuestion} className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="question-area" className="font-semibold">
                   {mode === 'Exam Mode' ? 'Topic' : mode === 'Mistake Finder' ? 'Your Explanation' : 'Your Question'}
                </Label>
                <Textarea
                  id="question-area"
                  placeholder={
                      mode === 'Normal Learning' ? "e.g., Explain the mechanism of action of Metformin" :
                      mode === 'Concept Builder' ? "e.g., How does the Renin-Angiotensin system work?" :
                      mode === 'Exam Mode' ? "e.g., Pharmacology of antibiotics" :
                      "e.g., Insulin works by increasing sugar in the blood..."
                  }
                  className="min-h-[120px] text-base"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={isLoading}
                />
              </div>

               <div className="space-y-2">
                <Label htmlFor="file-upload" className="font-semibold">Upload File (Optional)</Label>
                <p className="text-xs text-muted-foreground">Attach an image or document. The AI will answer based on the file content, overriding the selected mode.</p>
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
                      >
                        <m.icon className="h-4 w-4" />
                        <span>{m.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {mode === 'Exam Mode' && !file && (
                <div className="space-y-2 pt-2 animate-in fade-in">
                  <Label className="font-semibold">Difficulty</Label>
                  <RadioGroup defaultValue="Easy" value={difficulty} onValueChange={(v: Difficulty) => setDifficulty(v)} className='flex items-center gap-4'>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Easy" id="r1" />
                      <Label htmlFor="r1">Easy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Medium" id="r2" />
                      <Label htmlFor="r2">Medium</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Hard" id="r3" />
                      <Label htmlFor="r3">Hard</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}


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

        <div ref={resultsRef} className="w-full scroll-mt-20">
          {isLoading && (
            <Card className="flex flex-col min-h-[400px] items-center justify-center">
                <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p>Preparing your learning module...</p>
                </div>
            </Card>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {answer && !isLoading && (
            <Card className="animate-in fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Generated Response
                </CardTitle>
                <CardDescription>
                  Your structured answer based on the selected mode.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderResults()}
              </CardContent>
            </Card>
          )}
          
          {!isLoading && !answer && !error && (
            <Card className="text-center text-muted-foreground min-h-[400px] flex flex-col justify-center items-center p-8 border-2 border-dashed">
                <p className="text-lg font-medium">Your AI Medical Teacher is ready.</p>
                <p className="mt-2 text-sm">Ask a question to begin your session.</p>
            </Card>
          )}

        </div>
      </div>
    </div>
    </>
  );
}
