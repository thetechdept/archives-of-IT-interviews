export interface Interview {
  id: string;
  title: string;
  interviewee: string;
  company: string;
  role: string;
  date: string;
  duration: string;
  summary: string;
  themes: string[];
  industry: string;
  decade: string;
  videoUrl: string;
  thumbnailUrl: string;
  transcript?: string;
  sections?: VideoSection[];
}

export interface VideoSection {
  id: string;
  title: string;
  summary: string;
  startTime: string;
  endTime: string;
  timestamp: number; // in seconds
  relevanceScore?: number;
  keywords: string[];
}

export const mockInterviews: Interview[] = [
  {
    id: '1',
    title: 'The Future of Cybersecurity',
    interviewee: 'Ross Anderson',
    company: 'University of Cambridge',
    role: 'Professor of Security Engineering',
    date: '2024-01-15',
    duration: '45:30',
    summary: 'Professor Ross Anderson discusses the evolution of cybersecurity, emerging threats in the digital age, and the importance of building secure systems from the ground up.',
    themes: ['Cybersecurity', 'Privacy', 'Digital Rights'],
    industry: 'Academic Research',
    decade: '2020s',
    videoUrl: 'https://example.com/video1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    transcript: 'In this interview, we discuss the fundamental challenges facing cybersecurity today...',
    sections: [
      {
        id: '1.1',
        title: 'Introduction to Cybersecurity',
        summary: 'Professor Anderson introduces the concept of cybersecurity and its importance.',
        startTime: '00:00',
        endTime: '05:00',
        timestamp: 300,
        relevanceScore: 10,
        keywords: ['cybersecurity', 'importance', 'introduction']
      },
      {
        id: '1.2',
        title: 'Emerging Threats',
        summary: 'Professor Anderson discusses the latest threats in the digital age.',
        startTime: '05:00',
        endTime: '10:00',
        timestamp: 600,
        relevanceScore: 8,
        keywords: ['emerging threats', 'digital age', 'threats']
      },
      {
        id: '1.3',
        title: 'Building Secure Systems',
        summary: 'Professor Anderson explains how to build secure systems from the ground up.',
        startTime: '10:00',
        endTime: '15:00',
        timestamp: 900,
        relevanceScore: 9,
        keywords: ['secure systems', 'ground up', 'building']
      }
    ]
  },
  {
    id: '2',
    title: 'Building Scalable Systems at Scale',
    interviewee: 'Sarah Chen',
    company: 'Meta',
    role: 'VP of Engineering',
    date: '2024-01-10',
    duration: '52:15',
    summary: 'Sarah Chen shares insights on architecting systems that serve billions of users, discussing the technical and organizational challenges of scaling at Meta.',
    themes: ['System Architecture', 'Scaling', 'Leadership'],
    industry: 'Social Media',
    decade: '2020s',
    videoUrl: 'https://example.com/video2.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1494790108755-2616b60b00e5?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'The Rise of Open Source',
    interviewee: 'Linus Torvalds',
    company: 'Linux Foundation',
    role: 'Creator of Linux',
    date: '2024-01-05',
    duration: '38:45',
    summary: 'Linus Torvalds reflects on the journey of Linux, the philosophy of open source development, and its impact on the technology industry.',
    themes: ['Open Source', 'Linux', 'Software Development'],
    industry: 'Operating Systems',
    decade: '2020s',
    videoUrl: 'https://example.com/video3.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'AI Ethics and the Future',
    interviewee: 'Dr. Timnit Gebru',
    company: 'Distributed AI Research Institute',
    role: 'Founder',
    date: '2023-12-20',
    duration: '41:20',
    summary: 'Dr. Timnit Gebru discusses the ethical implications of AI development, bias in machine learning systems, and the need for responsible AI research.',
    themes: ['AI Ethics', 'Machine Learning', 'Bias'],
    industry: 'Artificial Intelligence',
    decade: '2020s',
    videoUrl: 'https://example.com/video4.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Quantum Computing Breakthroughs',
    interviewee: 'John Preskill',
    company: 'Caltech',
    role: 'Professor of Theoretical Physics',
    date: '2023-12-15',
    duration: '49:10',
    summary: 'John Preskill explains the current state of quantum computing, recent breakthroughs, and what the future holds for quantum technologies.',
    themes: ['Quantum Computing', 'Physics', 'Innovation'],
    industry: 'Quantum Technology',
    decade: '2020s',
    videoUrl: 'https://example.com/video5.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507444682980-69978e4e66ce?w=400&h=300&fit=crop'
  }
];

export const searchSuggestions = [
  "What are the biggest challenges in cybersecurity today?",
  "How has open source changed the software industry?",
  "What ethical considerations are important in AI development?",
  "How do you scale systems to serve millions of users?",
  "What breakthroughs are happening in quantum computing?"
];