import { Search, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onNavigate?: (page: string) => void;
}

export function Header({ onSearch, onNavigate }: HeaderProps) {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate?.('home')}
              className="text-xl font-medium text-primary hover:text-primary/80"
            >
              ArchivesIT
            </button>
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => onNavigate?.('home')}
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate?.('search')}
                className="text-muted-foreground hover:text-foreground"
              >
                Browse Interviews
              </button>
              <button 
                onClick={() => onNavigate?.('ask')}
                className="text-muted-foreground hover:text-foreground"
              >
                Ask a Question
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search interviews..."
                className="w-64 pl-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearch?.(e.currentTarget.value);
                  }
                }}
              />
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}