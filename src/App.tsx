import { useState } from 'react';
import { Header } from './components/Header';
import { Homepage } from './components/Homepage';
import { SearchPage } from './components/SearchPage';
import { InterviewPage } from './components/InterviewPage';
import { AskPage } from './components/AskPage';

type Page = 'home' | 'search' | 'interview' | 'ask';

interface PageData {
  query?: string;
  id?: string;
  timestamp?: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageData, setPageData] = useState<PageData>({});

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page as Page);
    setPageData(data || {});
  };

  const handleSearch = (query: string) => {
    setCurrentPage('search');
    setPageData({ query });
  };

  const handleAISearch = (query: string) => {
    setCurrentPage('ask');
    setPageData({ query });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onNavigate={handleNavigate} onSearch={handleSearch} onAISearch={handleAISearch} />;
      case 'search':
        return <SearchPage onNavigate={handleNavigate} initialQuery={pageData.query} />;
      case 'interview':
        return <InterviewPage interviewId={pageData.id!} onNavigate={handleNavigate} />;
      case 'ask':
        return <AskPage onNavigate={handleNavigate} initialQuery={pageData.query} />;
      default:
        return <Homepage onNavigate={handleNavigate} onSearch={handleSearch} onAISearch={handleAISearch} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} onNavigate={handleNavigate} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}