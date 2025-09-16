import { Search, TrendingUp, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { InterviewCard } from './InterviewCard';
import { mockInterviews, searchSuggestions } from '../data/mockData';
import { useState } from 'react';

interface HomepageProps {
  onNavigate?: (page: string, data?: any) => void;
  onSearch?: (query: string) => void;
  onAISearch?: (query: string) => void;
}

export function Homepage({ onNavigate, onSearch, onAISearch }: HomepageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiQuery, setAIQuery] = useState('');
  const recentInterviews = mockInterviews.slice(0, 3);

  const handleStandardSearch = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      onNavigate?.('search', { query: searchQuery });
    }
  };

  const handleAISearch = () => {
    if (aiQuery.trim()) {
      onAISearch?.(aiQuery);
      onNavigate?.('ask', { query: aiQuery });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAIQuery(suggestion);
    onAISearch?.(suggestion);
    onNavigate?.('ask', { query: suggestion });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl">
            Tech Leaders Share Their Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover insights from pioneering technologists, entrepreneurs, and researchers who shaped the digital world. 
            Search through decades of interviews or ask our AI to find exactly what you're looking for.
          </p>
        </div>
        
        {/* Search Options */}
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Standard Search */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Browse Interviews</h3>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search interviews, people, companies, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleStandardSearch();
                      }
                    }}
                  />
                  <Button onClick={handleStandardSearch} disabled={!searchQuery.trim()}>
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Search */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Ask Our AI</h3>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a question about any tech topic..."
                    value={aiQuery}
                    onChange={(e) => setAIQuery(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAISearch();
                      }
                    }}
                  />
                  <Button onClick={handleAISearch} disabled={!aiQuery.trim()}>
                    Ask AI
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {searchSuggestions.slice(0, 3).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-sm"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Interviews */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Latest Interviews</h2>
            <p className="text-muted-foreground">The most recent conversations with tech leaders</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => onNavigate?.('search')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            View All
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
              onClick={() => onNavigate?.('interview', { id: interview.id })}
            />
          ))}
        </div>
      </section>

      {/* Action Cards */}
      <section className="grid md:grid-cols-2 gap-6">
        <Card className="group cursor-pointer transition-all hover:shadow-lg" onClick={() => onNavigate?.('search')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Browse All Interviews
            </CardTitle>
            <CardDescription>
              Search and filter through our complete archive of tech interviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Filter by theme, industry, company, decade and more to find exactly what you're looking for.
            </p>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-lg" onClick={() => onNavigate?.('ask')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Ask Our AI
            </CardTitle>
            <CardDescription>
              Ask questions and get answers with links to relevant interview segments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get intelligent answers to your questions with direct links to the most relevant parts of interviews.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}