'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { LifeBuoy, FileQuestion, MessageSquare, Loader2, Info, Search, Paperclip, X } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supportChat } from '@/ai/flows/support-chat';

const faqItems = [
    {
        category: 'Account & Billing',
        question: 'How do I upgrade my plan?',
        answer: 'You can upgrade your plan at any time from the "Billing" section in your dashboard. Simply select the plan you wish to upgrade to and follow the payment instructions.',
    },
    {
        category: 'Technical Issues',
        question: 'The AI response seems slow. What can I do?',
        answer: 'Response times can vary based on server load and the complexity of your query. Premium plan users receive priority processing. If the issue persists, please check your internet connection or try again after a few moments.',
    },
     {
        category: 'Account & Billing',
        question: 'What is your refund policy for lifetime plans?',
        answer: 'We offer a 30-day money-back guarantee on all lifetime plans. If you are not satisfied, you can request a full refund within 30 days of purchase. Monthly and yearly plans can be canceled at any time, and your access will continue until the end of the billing period.',
    },
    {
        category: 'AI Doctor & Appointments',
        question: 'Can the AI Doctor provide a diagnosis?',
        answer: 'No. The AI Doctor is an informational tool designed to provide guidance and help you understand your symptoms. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns.',
    },
     {
        category: 'Learning & AI Features',
        question: 'Why does the Smart Answer feature say I need to upgrade?',
        answer: 'The Smart Answer feature, which includes image and document analysis, is available on our Standard and Premium plans. The Free plan includes access to the text-based Learning module. You can upgrade from the Pricing or Billing page to unlock this feature.',
    },
    {
        category: 'Technical Issues',
        question: 'I uploaded an image but it failed to analyze. What should I do?',
        answer: 'Please ensure the image is clear, well-lit, and not blurry. Our AI works best with high-quality images. If the problem continues, try a different image or submit a support ticket with the image attached, and our team will investigate.',
    }
];

const faqCategories = ['All', 'Account & Billing', 'Learning & AI Features', 'AI Doctor & Appointments', 'Technical Issues'];


function SupportForm() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        toast({
            title: "Support Ticket Submitted",
            description: "Your ticket has been received. Our team will get back to you shortly. Your ticket number is #C-12345.",
        });
        setFile(null);
        // Reset form fields
        (e.target as HTMLFormElement).reset();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const removeFile = () => {
        setFile(null);
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Valued User" disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="user@example.com" disabled />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Issue with AI Doctor response" required disabled={isLoading} />
            </div>
             <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                     <Select name="priority" defaultValue="medium" disabled={isLoading}>
                        <SelectTrigger id="priority">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Please describe your issue in detail..." className="min-h-32" required disabled={isLoading} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="file-upload">Attachment (optional)</Label>
                {!file ? (
                     <Input id="file-upload" type="file" onChange={handleFileChange} disabled={isLoading} />
                ) : (
                    <div className="flex items-center justify-between rounded-md border p-2 bg-muted">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Paperclip className="h-4 w-4" />
                            <span className="truncate max-w-xs">{file.name}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={removeFile} disabled={isLoading}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Submitting...' : 'Submit Ticket'}
            </Button>
        </form>
    );
}

function LiveChatModal({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) {
    const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Initial greeting when chat opens
    useEffect(() => {
        if (isOpen && chatMessages.length === 0) {
            setIsChatLoading(true);
            setTimeout(() => {
                setChatMessages([{ role: 'assistant', content: "Hello! My name is Alex. How can I assist you today?" }]);
                setIsChatLoading(false);
            }, 1000);
        }
    }, [isOpen, chatMessages.length]);

    // Scroll to bottom when new messages are added
    useEffect(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('div');
            if (viewport) {
                viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
            }
        }
    }, [chatMessages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim() || isChatLoading) return;

        const userMessage = { role: 'user' as const, content: chatInput };
        setChatMessages(prev => [...prev, userMessage]);
        setChatInput('');
        setIsChatLoading(true);

        // Call the new AI flow
        try {
            const conversationHistory = [...chatMessages, userMessage]
                .map(m => `${m.role === 'user' ? 'User' : 'Support'}: ${m.content}`)
                .join('\n');
            
            const response = await supportChat({ conversationHistory });

            setChatMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
        } catch (error) {
            console.error("Support chat error:", error);
            setChatMessages(prev => [...prev, { role: 'assistant', content: "I'm having some trouble connecting at the moment. Please try again in a few seconds." }]);
        } finally {
            setIsChatLoading(false);
        }
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg p-0">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle className="flex items-center gap-2">
                        <MessageSquare />
                        Live Support
                    </DialogTitle>
                    <DialogDescription>Chat with a support specialist.</DialogDescription>
                </DialogHeader>
                <div className="p-4">
                    <ScrollArea className="h-[400px] w-full" ref={scrollAreaRef}>
                        <div className="space-y-4 pr-4">
                            {chatMessages.map((message, index) => (
                                <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                                    {message.role === 'assistant' && (
                                        <Avatar className="h-8 w-8 border">
                                            <AvatarFallback className='bg-primary/10 text-primary'>A</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`rounded-lg px-4 py-2 max-w-[80%] text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        {message.content}
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar className="h-8 w-8 border">
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isChatLoading && (
                               <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8 border"><AvatarFallback className='bg-primary/10 text-primary'>A</AvatarFallback></Avatar>
                                    <div className="rounded-lg px-4 py-2 bg-muted">
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
                </div>
                <DialogFooter className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                        <Input 
                            placeholder="Type your message..." 
                            value={chatInput} 
                            onChange={(e) => setChatInput(e.target.value)} 
                            disabled={isChatLoading}
                            autoComplete="off"
                        />
                        <Button type="submit" disabled={isChatLoading || !chatInput.trim()}>Send</Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function SupportPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [plan, setPlan] = useState<string | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const storedPlan = localStorage.getItem('userPlan') || 'free';
        setPlan(storedPlan);
    }, []);
    
    const filteredFaqs = faqItems.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = searchTerm === '' || 
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const canUseChat = plan === 'premium' || plan === 'admin';
    
    return (
        <>
        <LiveChatModal isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
                    <LifeBuoy /> Support
                </h1>
                <p className="text-muted-foreground">
                    Get help or contact our support team. We're here to assist you.
                </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MessageSquare /> Submit a Support Ticket</CardTitle>
                            <CardDescription>Our team will get back to you as soon as possible.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <SupportForm />
                        </CardContent>
                    </Card>
                </div>
                
                <div className="lg:col-span-1 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><FileQuestion /> Help Center</CardTitle>
                            <CardDescription>Find quick answers to common questions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative mb-4">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    placeholder="Search FAQs..."
                                    className="pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                                <ScrollArea>
                                    <TabsList>
                                        {faqCategories.map(cat => (
                                            <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                                        ))}
                                    </TabsList>
                                    <ScrollBar orientation='horizontal' />
                                </ScrollArea>
                            </Tabs>
                            <Accordion type="single" collapsible className="mt-4 max-h-96 overflow-y-auto pr-2">
                                {filteredFaqs.length > 0 ? filteredFaqs.map((item, index) => (
                                    <AccordionItem value={`item-${index}`} key={index}>
                                        <AccordionTrigger>{item.question}</AccordionTrigger>
                                        <AccordionContent>{item.answer}</AccordionContent>
                                    </AccordionItem>
                                )) : (
                                    <p className="text-center text-sm text-muted-foreground py-4">No results found.</p>
                                )}
                            </Accordion>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Live Chat</CardTitle>
                            <CardDescription>Get instant help from our support team.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" disabled={!canUseChat} onClick={() => setIsChatOpen(true)}>
                                <MessageSquare className="mr-2 h-4 w-4"/> {canUseChat ? 'Start Chat' : 'Start Chat (Premium Only)'}
                            </Button>
                        </CardContent>
                    </Card>

                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Response Times</AlertTitle>
                        <AlertDescription>
                            We typically respond to support tickets within 24 business hours. Premium users receive priority support.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </div>
        </>
    )
}
