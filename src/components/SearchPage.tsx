import { useState, useMemo } from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { InterviewCard } from './InterviewCard';
import { mockInterviews, Interview } from '../data/mockData';

interface SearchPageProps {
  onNavigate?: (page: string, data?: any) => void;
  initialQuery?: string;
}

export function SearchPage({ onNavigate, initialQuery = '' }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('date');
  const [filterTheme, setFilterTheme] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterDecade, setFilterDecade] = useState('all');

  // Get unique values for filters
  const allThemes = useMemo(() => {
    const themes = new Set<string>();
    mockInterviews.forEach(interview => {
      interview.themes.forEach(theme => themes.add(theme));
    });
    return Array.from(themes).sort();
  }, []);

  const allIndustries = useMemo(() => {
    const industries = new Set(mockInterviews.map(interview => interview.industry));
    return Array.from(industries).sort();
  }, []);

  const allDecades = useMemo(() => {
    const decades = new Set(mockInterviews.map(interview => interview.decade));
    return Array.from(decades).sort();
  }, []);

  // Filter and sort interviews
  const filteredInterviews = useMemo(() => {
    let filtered = mockInterviews.filter(interview => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = `
          ${interview.title} 
          ${interview.interviewee} 
          ${interview.company} 
          ${interview.summary} 
          ${interview.themes.join(' ')}
        `.toLowerCase();
        
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      // Theme filter
      if (filterTheme !== 'all' && !interview.themes.includes(filterTheme)) {
        return false;
      }

      // Industry filter
      if (filterIndustry !== 'all' && interview.industry !== filterIndustry) {
        return false;
      }

      // Decade filter
      if (filterDecade !== 'all' && interview.decade !== filterDecade) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'interviewee':
          return a.interviewee.localeCompare(b.interviewee);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, filterTheme, filterIndustry, filterDecade]);

  const clearFilters = () => {
    setSearchQuery('');
    setFilterTheme('all');
    setFilterIndustry('all');
    setFilterDecade('all');
  };

  const activeFiltersCount = [filterTheme, filterIndustry, filterDecade].filter(f => f !== 'all').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl">Browse Interviews</h1>
          <p className="text-muted-foreground mt-2">
            Search and filter through our archive of tech industry interviews
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search interviews, people, companies, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={filterTheme} onValueChange={setFilterTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Themes</SelectItem>
                  {allThemes.map(theme => (
                    <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {allIndustries.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterDecade} onValueChange={setFilterDecade}>
                <SelectTrigger>
                  <SelectValue placeholder="Decade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Decades</SelectItem>
                  {allDecades.map(decade => (
                    <SelectItem key={decade} value={decade}>{decade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Most Recent</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="interviewee">Interviewee A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {(activeFiltersCount > 0 || searchQuery) && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary">
                    Search: "{searchQuery}"
                  </Badge>
                )}
                {filterTheme !== 'all' && (
                  <Badge variant="secondary">
                    Theme: {filterTheme}
                  </Badge>
                )}
                {filterIndustry !== 'all' && (
                  <Badge variant="secondary">
                    Industry: {filterIndustry}
                  </Badge>
                )}
                {filterDecade !== 'all' && (
                  <Badge variant="secondary">
                    Decade: {filterDecade}
                  </Badge>
                )}
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredInterviews.length} interview{filteredInterviews.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                Sorted by {sortBy === 'date' ? 'most recent' : sortBy}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                onClick={() => onNavigate?.('interview', { id: interview.id })}
              />
            ))}
          </div>

          {filteredInterviews.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">
                  No interviews found matching your criteria. Try adjusting your search or filters.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}