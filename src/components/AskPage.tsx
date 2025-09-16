import { useState, useEffect } from 'react';
import { MessageCircle, Send, ExternalLink, Clock, User, Play, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { searchSuggestions, mockInterviews, Interview, VideoSection } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AskPageProps {
  onNavigate?: (page: string, data?: any) => void;
  initialQuery?: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: number;
  clickableSegments?: ClickableSegment[];
}

interface ClickableSegment {
  id: string;
  text: string;
  interviewId: string;
  sectionId: string;
  timestamp: number;
}

interface InterviewResult {
  interview: Interview;
  relevantSections: Array<VideoSection & { relevanceScore: number }>;
  overallRelevance: number;
}

export function AskPage({ onNavigate, initialQuery = '' }: AskPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I can help you find information across our entire archive of tech interviews. Ask me any question and I\'ll search through all our content to find the most relevant answers and interview segments.',
      timestamp: Date.now()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<InterviewResult[]>([]);

  // Process initial query if provided
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleAISearch(initialQuery);
    }
  }, [initialQuery]);

  const generateMockSections = (interview: Interview, query: string): Array<VideoSection & { relevanceScore: number }> => {
    // Generate mock relevant sections based on query
    const mockSections: Array<VideoSection & { relevanceScore: number }> = [
      {
        id: `${interview.id}.1`,
        title: `Main discussion on ${query.split(' ').slice(0, 2).join(' ')}`,
        summary: `${interview.interviewee} provides key insights about ${query.toLowerCase()} and its impact on the industry.`,
        startTime: '12:34',
        endTime: '18:20',
        timestamp: 754,
        keywords: query.split(' '),
        relevanceScore: 95
      },
      {
        id: `${interview.id}.2`,
        title: `Real-world examples and case studies`,
        summary: `Practical examples and case studies related to ${query.toLowerCase()} from ${interview.company}.`,
        startTime: '28:15',
        endTime: '32:45',
        timestamp: 1695,
        keywords: query.split(' '),
        relevanceScore: 87
      },
      {
        id: `${interview.id}.3`,
        title: `Future implications and predictions`,
        summary: `${interview.interviewee} discusses future trends and predictions regarding ${query.toLowerCase()}.`,
        startTime: '35:20',
        endTime: '40:10',
        timestamp: 2120,
        keywords: query.split(' '),
        relevanceScore: 78
      }
    ];

    return mockSections.slice(0, Math.floor(Math.random() * 3) + 1);
  };

  const generateClickableResponse = (query: string, results: InterviewResult[]): { content: string; clickableSegments: ClickableSegment[] } => {
    // Generate a natural language response with clickable segments
    const segments: ClickableSegment[] = [];
    let content = '';

    if (results.length > 0) {
      const topResult = results[0];
      const sections = topResult.relevantSections;
      
      // Create a response based on the query
      if (query.toLowerCase().includes('cybersecurity') || query.toLowerCase().includes('security')) {
        content = `${topResult.interview.interviewee} discusses the fundamentals of cybersecurity and emphasizes the importance of building secure systems from the ground up. He also explores emerging threats in the digital age and shares insights on modern security challenges.`;
        
        if (sections.length > 0) {
          segments.push({
            id: 'seg1',
            text: 'fundamentals of cybersecurity',
            interviewId: topResult.interview.id,
            sectionId: sections[0].id,
            timestamp: sections[0].timestamp
          });
        }
        
        if (sections.length > 1) {
          segments.push({
            id: 'seg2',
            text: 'emerging threats in the digital age',
            interviewId: topResult.interview.id,
            sectionId: sections[1].id,
            timestamp: sections[1].timestamp
          });
        }
      } else if (query.toLowerCase().includes('ai') || query.toLowerCase().includes('artificial intelligence')) {
        content = `${topResult.interview.interviewee} explores the ethical implications of AI development and discusses the importance of addressing bias in machine learning systems. The conversation also covers responsible AI research practices and future considerations.`;
        
        if (sections.length > 0) {
          segments.push({
            id: 'seg1',
            text: 'ethical implications of AI development',
            interviewId: topResult.interview.id,
            sectionId: sections[0].id,
            timestamp: sections[0].timestamp
          });
        }
        
        if (sections.length > 1) {
          segments.push({
            id: 'seg2',
            text: 'bias in machine learning systems',
            interviewId: topResult.interview.id,
            sectionId: sections[1].id,
            timestamp: sections[1].timestamp
          });
        }
      } else {
        content = `${topResult.interview.interviewee} shares valuable insights about ${query.toLowerCase()} and discusses its practical applications and future implications. The conversation covers both technical aspects and industry perspectives.`;
        
        if (sections.length > 0) {
          segments.push({
            id: 'seg1',
            text: `insights about ${query.toLowerCase()}`,
            interviewId: topResult.interview.id,
            sectionId: sections[0].id,
            timestamp: sections[0].timestamp
          });
        }
        
        if (sections.length > 1) {
          segments.push({
            id: 'seg2',
            text: 'practical applications and future implications',
            interviewId: topResult.interview.id,
            sectionId: sections[1].id,
            timestamp: sections[1].timestamp
          });
        }
      }
    }

    return { content, clickableSegments: segments };
  };

  const handleAISearch = async (query: string) => {
    if (!query.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI processing and generate results
    setTimeout(() => {
      // Generate mock interview results
      const results: InterviewResult[] = mockInterviews
        .map(interview => ({
          interview,
          relevantSections: generateMockSections(interview, query),
          overallRelevance: Math.floor(Math.random() * 30) + 70 // 70-100% relevance
        }))
        .sort((a, b) => b.overallRelevance - a.overallRelevance)
        .slice(0, 4);

      setSearchResults(results);

      // Generate clickable response
      const { content, clickableSegments } = generateClickableResponse(query, results);

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content,
        timestamp: Date.now(),
        clickableSegments
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);

    setNewMessage('');
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    handleAISearch(newMessage);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleAISearch(suggestion);
  };

  const handleSegmentClick = (segment: ClickableSegment) => {
    scrollToSection(segment.sectionId);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const renderMessageContent = (message: ChatMessage) => {
    if (message.type === 'user' || !message.clickableSegments || message.clickableSegments.length === 0) {
      return <p className="text-sm leading-relaxed">{message.content}</p>;
    }

    // Split content and insert clickable segments
    let content = message.content;
    const segments = [...message.clickableSegments].sort((a, b) => 
      content.indexOf(a.text) - content.indexOf(b.text)
    );

    const parts: (string | ClickableSegment)[] = [];
    let lastIndex = 0;

    segments.forEach(segment => {
      const index = content.indexOf(segment.text, lastIndex);
      if (index !== -1) {
        // Add text before the segment
        if (index > lastIndex) {
          parts.push(content.slice(lastIndex, index));
        }
        // Add the clickable segment
        parts.push(segment);
        lastIndex = index + segment.text.length;
      }
    });

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return (
      <p className="text-sm leading-relaxed">
        {parts.map((part, index) => {
          if (typeof part === 'string') {
            return part;
          } else {
            return (
              <button
                key={index}
                onClick={() => handleSegmentClick(part)}
                className="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors cursor-pointer"
              >
                {part.text}
              </button>
            );
          }
        })}
      </p>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl">Ask Our AI</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ask questions about any topic and our AI will search through decades of tech interviews 
            to find the most relevant answers and interview segments.
          </p>
        </div>

        {/* Chat Interface */}
        <Card className="h-[500px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Interview Assistant
            </CardTitle>
            <CardDescription>
              Ask questions and get intelligent answers with clickable links to specific interview segments
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] ${message.type === 'user' ? '' : 'w-full'}`}>
                      <div className={`rounded-lg p-4 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-12' 
                          : 'bg-muted'
                      }`}>
                        <div className="flex items-start gap-2">
                          {message.type === 'ai' && (
                            <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          )}
                          {message.type === 'user' && (
                            <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            {renderMessageContent(message)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-4 max-w-[85%]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <Separator />

            <div className="p-4 flex gap-2">
              <Textarea
                placeholder="Ask a question about any tech topic..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="self-end"
                disabled={isLoading || !newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions - only show if no results yet */}
        {searchResults.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Popular Questions</CardTitle>
              <CardDescription>
                Get started with these common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {searchSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-4 text-left"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <MessageCircle className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>{suggestion}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">Related Interview Segments</h2>
              <p className="text-muted-foreground">
                {searchResults.length} relevant interview{searchResults.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="space-y-6">
              {searchResults.map((result) => (
                <Card key={result.interview.id} className="overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Interview Info */}
                    <div className="md:col-span-1 p-6 border-r">
                      <div className="space-y-4">
                        <div className="aspect-video w-full overflow-hidden rounded-lg cursor-pointer group"
                             onClick={() => onNavigate?.('interview', { id: result.interview.id })}>
                          <div className="relative">
                            <ImageWithFallback
                              src={result.interview.thumbnailUrl}
                              alt={result.interview.interviewee}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="h-8 w-8 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium leading-tight">
                            {result.interview.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {result.interview.interviewee}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {result.interview.company} • {result.interview.duration}
                          </p>
                          <Badge variant="secondary">
                            {result.overallRelevance}% relevant
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Relevant Sections */}
                    <div className="md:col-span-2 p-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Relevant Segments</h4>
                        <div className="space-y-3">
                          {result.relevantSections.map((section) => (
                            <div 
                              key={section.id}
                              id={section.id}
                              className="p-4 bg-muted rounded-lg cursor-pointer hover:bg-accent transition-colors"
                              onClick={() => onNavigate?.('interview', { 
                                id: result.interview.id, 
                                timestamp: section.timestamp 
                              })}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-medium text-sm">{section.title}</h5>
                                    <Badge variant="outline" className="text-xs">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {section.startTime}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {section.summary}
                                  </p>
                                  <div className="flex items-center gap-1">
                                    <Badge variant="secondary" className="text-xs">
                                      {section.relevanceScore}% relevant
                                    </Badge>
                                  </div>
                                </div>
                                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}