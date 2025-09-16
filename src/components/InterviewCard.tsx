import { Calendar, Clock, Building } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Interview } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface InterviewCardProps {
  interview: Interview;
  onClick?: () => void;
}

export function InterviewCard({ interview, onClick }: InterviewCardProps) {
  return (
    <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1" onClick={onClick}>
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <ImageWithFallback
          src={interview.thumbnailUrl}
          alt={interview.interviewee}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-medium leading-tight group-hover:text-primary transition-colors">
              {interview.title}
            </h3>
            <p className="text-muted-foreground mt-1">
              {interview.interviewee}
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building className="h-3 w-3" />
              <span>{interview.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{interview.duration}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(interview.date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {interview.themes.slice(0, 2).map((theme) => (
              <Badge key={theme} variant="secondary" className="text-xs">
                {theme}
              </Badge>
            ))}
            {interview.themes.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{interview.themes.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}