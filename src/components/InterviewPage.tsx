import { useState } from 'react';
import { Play, Pause, Calendar, Clock, Building, MessageSquare, Send, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { mockInterviews, Interview } from '../data/mockData';

interface InterviewPageProps {
  interviewId: string;
  onNavigate?: (page: string, data?: any) => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp?: number;
  references?: Array<{
    title: string;
    timeCode: string;
    url: string;
  }>;
}

export function InterviewPage({ interviewId, onNavigate }: InterviewPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I can help you find specific information from this interview. Ask me anything about the topics discussed.',
      timestamp: Date.now()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const interview = mockInterviews.find(i => i.id === interviewId);

  if (!interview) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground">Interview not found.</p>
            <Button className="mt-4" onClick={() => onNavigate?.('home')}>
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: Date.now()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Based on this interview, I can tell you that ${interview.interviewee} discussed several key points related to your question. Here are the most relevant segments:`,
        timestamp: Date.now(),
        references: [
          {
            title: 'Main discussion on this topic',
            timeCode: '12:34',
            url: '#t=754'
          },
          {
            title: 'Follow-up insights',
            timeCode: '28:15',
            url: '#t=1695'
          }
        ]
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setNewMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <Card>
            <div className="aspect-video bg-black rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/90 hover:bg-white text-black"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 text-white bg-black/50 px-2 py-1 rounded text-sm">
                {interview.duration}
              </div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl mb-2">{interview.title}</h1>
                  <p className="text-lg text-muted-foreground">{interview.interviewee}</p>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>{interview.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(interview.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{interview.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {interview.themes.map((theme) => (
                    <Badge key={theme} variant="secondary">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Interview Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{interview.summary}</p>
            </CardContent>
          </Card>

          {/* Key Topics (placeholder) */}
          <Card>
            <CardHeader>
              <CardTitle>Key Topics Discussed</CardTitle>
              <CardDescription>
                Major themes and topics covered in this interview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {interview.themes.map((theme, index) => (
                  <div key={theme} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>{theme}</span>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Chat */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Ask About This Interview
              </CardTitle>
              <CardDescription>
                Ask questions about the content and get specific answers with timestamps
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        {message.references && (
                          <div className="mt-3 space-y-2">
                            {message.references.map((ref, index) => (
                              <div key={index} className="bg-background rounded p-2 text-xs">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{ref.title}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {ref.timeCode}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <Separator />
              
              <div className="p-4 flex gap-2">
                <Textarea
                  placeholder="Ask a question about this interview..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} size="icon" className="self-end">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Interviews */}
          <Card>
            <CardHeader>
              <CardTitle>Related Interviews</CardTitle>
              <CardDescription>
                Other interviews on similar topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockInterviews
                  .filter(i => i.id !== interview.id)
                  .slice(0, 3)
                  .map((relatedInterview) => (
                    <div 
                      key={relatedInterview.id} 
                      className="flex gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => onNavigate?.('interview', { id: relatedInterview.id })}
                    >
                      <div className="w-16 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={relatedInterview.thumbnailUrl} 
                          alt={relatedInterview.interviewee}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{relatedInterview.title}</p>
                        <p className="text-xs text-muted-foreground">{relatedInterview.interviewee}</p>
                        <p className="text-xs text-muted-foreground">{relatedInterview.duration}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}