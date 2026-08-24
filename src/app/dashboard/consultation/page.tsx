'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { aiDoctorConsultation } from '@/ai/flows/ai-doctor-consultation';
import {
  Bot,
  User,
  CornerDownLeft,
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  imagePreview?: string | null;
  recommendationLevel?: 'none' | 'optional' | 'strong';
  suggestedSpecialty?: string;
};

// Renders markdown-like content with professional styling
const MessageContent = ({ content }: { content: string }) => {
  // This regex looks for bolded text and list items.
  const sections = content
    .split(/(\*\*.*?\*\*|- .*)/g)
    .filter((part) => part.trim() !== '');

  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul
          key={`ul-${elements.length}`}
          className="list-disc list-outside space-y-1 my-2 pl-5"
        >
          {currentList.map((item, idx) => (
            <li key={idx} className="text-sm leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  sections.forEach((section, index) => {
    if (section.startsWith('**') && section.endsWith('**')) {
      flushList();
      elements.push(
        <h4
          key={`h-${index}`}
          className="font-semibold text-base mt-4 mb-2 first:mt-0"
        >
          {section.slice(2, -2)}
        </h4>
      );
    } else if (section.startsWith('- ')) {
      currentList.push(section.substring(2));
    } else {
      flushList();
      elements.push(
        <p key={`p-${index}`} className="text-sm leading-relaxed">
          {section}
        </p>
      );
    }
  });

  flushList(); // Flush any remaining list items at the end

  return <div>{elements}</div>;
};

const RecommendationCard = ({
  level,
  specialty,
}: {
  level: 'optional' | 'strong';
  specialty?: string;
}) => {
  const isStrong = level === 'strong';
  const ctaText = isStrong ? 'Book Appointment' : 'Find a Doctor';
  const title = isStrong
    ? 'Doctor Visit Strongly Recommended'
    : 'Doctor Visit Recommended';
  const description = isStrong
    ? 'Your symptoms require professional evaluation.'
    : 'If symptoms persist, it is best to see a doctor.';

  return (
    <Card
      className={cn(
        'mt-4 animate-in fade-in',
        isStrong
          ? 'bg-destructive/10 border-destructive'
          : 'bg-amber-500/10 border-amber-500'
      )}
    >
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
        <div
          className={cn(
            'p-2 rounded-full',
            isStrong ? 'bg-destructive/20' : 'bg-amber-500/20'
          )}
        >
          <AlertCircle
            className={cn(
              'h-6 w-6',
              isStrong ? 'text-destructive' : 'text-amber-600'
            )}
          />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Button
          asChild
          className="w-full group"
          variant={isStrong ? 'destructive' : 'default'}
        >
          <Link
            href={`/dashboard/appointments?specialty=${
              specialty || 'General Physician'
            }&urgency=${level}`}
          >
            <Stethoscope className="mr-2 h-4 w-4" />
            {ctaText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function ConsultationPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMicClick = () => {
    toast({
      title: 'Feature Not Available',
      description: 'Voice input is currently unavailable in the web browser. Please use our mobile app for this feature.',
      variant: 'default',
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div');
      if (viewport) {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const resetFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !file) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      imagePreview: preview,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    if (preview) {
      resetFile();
    }

    setIsLoading(true);

    try {
      const conversationHistory = [...messages, userMessage]
        .map((m) => `${m.role}: ${m.content}`)
        .join('\n');

      const response = await aiDoctorConsultation({
        conversationHistory,
        uploadedFile: userMessage.imagePreview || undefined,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.advice,
        recommendationLevel: response.recommendationLevel,
        suggestedSpecialty: response.suggestedSpecialty,
      };
      setMessages((prev) => [...prev, assistantMessage]);
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
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-primary/10 rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <span>AI Doctor</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4">
            {messages.length === 0 && !isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="h-9 w-9 border-2 border-primary">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-3 bg-muted max-w-[80%]">
                  <p className="text-sm leading-relaxed">
                    Hello! I&apos;m your AI Doctor. How can I help you today?
                    Please describe your symptoms, or upload a file.
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
                  <Avatar className="h-9 w-9 border-2 border-primary">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <Bot size={20} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-3 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.imagePreview && message.role === 'user' && (
                    <Image
                      src={message.imagePreview}
                      alt="Uploaded attachment"
                      width={200}
                      height={200}
                      className="rounded-md mb-2 object-cover"
                    />
                  )}
                  {message.content && <MessageContent content={message.content} />}
                  {message.role === 'assistant' &&
                    message.recommendationLevel &&
                    message.recommendationLevel !== 'none' && (
                      <RecommendationCard
                        level={message.recommendationLevel}
                        specialty={message.suggestedSpecialty}
                      />
                    )}
                  {message.role === 'assistant' &&
                    message.recommendationLevel === 'none' && (
                      <Card className="mt-4 bg-green-500/10 border-green-500/50">
                        <CardHeader className="flex flex-row items-center gap-3 p-3 space-y-0">
                          <ShieldCheck className="h-5 w-5 text-green-600" />
                          <p className="text-sm font-medium">
                            Self-Care Recommended
                          </p>
                        </CardHeader>
                      </Card>
                    )}
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-9 w-9 border">
                    <AvatarFallback>
                      <User size={20} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="h-9 w-9 border-2 border-primary">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-3 bg-muted">
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
      {preview && (
        <div className="p-4 border-t flex items-center justify-between bg-muted/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {file?.type.startsWith('image/') ? (
              <Image
                src={preview}
                alt="Preview"
                width={40}
                height={40}
                className="rounded object-cover"
              />
            ) : (
              <FileText className="h-6 w-6" />
            )}
            <span className="truncate max-w-xs">{file?.name}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetFile}
            className="h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <CardFooter className="p-4 border-t">
        <form
          onSubmit={handleSendMessage}
          className="flex w-full items-center relative"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,application/pdf"
          />
           <Button
            variant="ghost"
            size="icon"
            className="absolute left-1 text-muted-foreground hover:text-foreground"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="h-5 w-5" />
          </Button>
          <Input
            id="message"
            placeholder="Describe your symptoms or ask about the file..."
            className="flex-1 h-12 pl-12 pr-20 rounded-lg bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <div className="absolute right-2 flex items-center gap-1">
            <Button
              type="submit"
              size="icon"
              className="bg-primary hover:bg-primary/90 rounded-md"
              disabled={isLoading || (!input.trim() && !file)}
            >
              <CornerDownLeft className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
