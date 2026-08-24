'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { aiDoctorConsultation } from '@/ai/flows/ai-doctor-consultation';
import { Bot, User, CornerDownLeft, Lock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { useDemoLimiter } from '@/hooks/use-demo-limiter';
import { Badge } from '@/components/ui/badge';


type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const SignupTeaser = () => (
  <Card className="mt-6 bg-secondary/50">
    <CardHeader>
      <CardTitle>Unlock the Full Conversation</CardTitle>
      <CardDescription>Create a free account to get:</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>Unlimited follow-up questions</li>
        <li>Ability to save your consultation history</li>
        <li>Access to learning insights based on your conversations</li>
        <li>Faster AI responses</li>
      </ul>
    </CardContent>
    <CardFooter>
      <Button asChild className="w-full">
        <Link href="/signup">Sign Up for Free</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function ConsultationPage() {
  const router = useRouter();
  const { isLimitReached, incrementUsage, isGuest, isReady } = useDemoLimiter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [conversationLocked, setConversationLocked] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReady && !isGuest) {
      router.push('/dashboard/consultation');
    }
  }, [router, isReady, isGuest]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || conversationLocked) return;

    if (isGuest) {
      if (isLimitReached) {
        setShowLimitModal(true);
        return;
      }
      if (messages.some(m => m.role === 'assistant')) {
        setConversationLocked(true);
        const lockMessage: Message = {
          role: 'assistant',
          content: "You've received your first free response. To continue this consultation and ask follow-up questions, please create a free account. Your conversation will not be saved.",
        };
        setMessages((prev) => [...prev, lockMessage]);
        return;
      }
      incrementUsage();
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if(isGuest) {
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    try {
      const conversationHistory = [...messages, userMessage]
        .map((m) => `${m.role}: ${m.content}`)
        .join('\n');

      const response = await aiDoctorConsultation({
        conversationHistory: conversationHistory,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.advice,
      };
      setMessages((prev) => [...prev, assistantMessage]);

       if (isGuest) {
          setConversationLocked(true);
      }

    } catch (error) {
      console.error('Error getting consultation:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content:
          "I'm sorry, but I'm having trouble connecting right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          AI Doctor Consultation
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Chat with our human-like AI Doctor about your symptoms and get
          professional, real-time medical guidance.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="max-w-3xl mx-auto lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="text-primary" />
              <span>AI Doctor</span>
               {isGuest && <Badge variant="outline">Demo Mode</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full pr-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.length === 0 && !isLoading && (
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot size={20} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-secondary max-w-[80%]">
                      <p className="text-sm">
                        Hello! I&apos;m your AI Doctor. How can I help you today?
                        Please describe your symptoms.
                      </p>
                    </div>
                  </div>
                )}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      message.role === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot size={20} />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] relative ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      }`}
                    >
                      {isGuest && message.role === 'assistant' && (
                        <Badge variant="outline" className="absolute -top-2 -right-2 text-xs">CuraAI Demo</Badge>
                      )}
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User size={20} />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot size={20} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-secondary">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-0"></span>
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-150"></span>
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-300"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form
              onSubmit={handleSendMessage}
              className="flex w-full items-center space-x-2"
            >
              <Input
                id="message"
                placeholder={conversationLocked ? "Please sign up to continue" : "Describe your symptoms..."}
                className="flex-1"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading || conversationLocked}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim() || conversationLocked}>
                {conversationLocked ? <Lock className="h-4 w-4" /> : <CornerDownLeft className="h-4 w-4" />}
              </Button>
            </form>
          </CardFooter>
        </Card>
        <div className="lg:col-span-1">
          {isGuest && <SignupTeaser />}
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-8 max-w-2xl mx-auto">
        Disclaimer: The AI Doctor is for informational purposes only and does
        not constitute medical advice. Please consult a qualified healthcare
        professional for any medical concerns.
      </p>
    </div>
  );
}
