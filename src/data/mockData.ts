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
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
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
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1494790108755-2616b60b00e5?w=400&h=300&fit=crop'
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
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop'
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
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop'
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
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1507444682980-69978e4e66ce?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    title: 'The Birth of COBOL',
    interviewee: 'Grace Hopper',
    company: 'US Navy',
    role: 'Rear Admiral',
    date: '1986-05-20',
    duration: '35:10',
    summary: 'Grace Hopper discusses the development of COBOL, the importance of human-readable programming languages, and her pioneering work in early computing.',
    themes: ['Programming Languages', 'COBOL', 'History of Computing'],
    industry: 'Government / Military',
    decade: '1980s',
    videoUrl: 'https://example.com/video6.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400&h=300&fit=crop',
    transcript: 'In this interview, Grace Hopper reflects on the motivations behind creating COBOL...',
    sections: [
      {
        id: '6.1',
        title: 'Early Days of Computing',
        summary: 'Hopper talks about working on the Mark I computer and the challenges of early programming.',
        startTime: '00:00',
        endTime: '08:30',
        timestamp: 510,
        relevanceScore: 9,
        keywords: ['Mark I', 'early computing', 'debugging']
      },
      {
        id: '6.2',
        title: 'Developing COBOL',
        summary: 'The story behind the creation of COBOL and the push for English-like programming languages.',
        startTime: '08:30',
        endTime: '20:00',
        timestamp: 1200,
        relevanceScore: 10,
        keywords: ['COBOL', 'programming languages', 'business computing']
      }
    ]
  },
  {
    id: '7',
    title: 'Weaving the Web: The Internet\'s Origins',
    interviewee: 'Vint Cerf',
    company: 'DARPA',
    role: 'Co-designer of TCP/IP',
    date: '1995-11-10',
    duration: '62:00',
    summary: 'Vint Cerf, one of the "fathers of the Internet," recounts the early days of ARPANET and the development of the TCP/IP protocols that underpin the modern internet.',
    themes: ['Internet', 'TCP/IP', 'ARPANET'],
    industry: 'Networking',
    decade: '1990s',
    videoUrl: 'https://example.com/video7.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    transcript: 'Vint Cerf provides a first-hand account of the collaborative effort to build the Internet...',
    sections: [
      {
        id: '7.1',
        title: 'The ARPANET Project',
        summary: 'Cerf discusses the goals and challenges of the ARPANET project.',
        startTime: '00:00',
        endTime: '15:00',
        timestamp: 900,
        relevanceScore: 8,
        keywords: ['ARPANET', 'DARPA', 'packet switching']
      },
      {
        id: '7.2',
        title: 'Designing TCP/IP',
        summary: 'The technical and social process of designing the core protocols of the Internet.',
        startTime: '15:00',
        endTime: '35:00',
        timestamp: 2100,
        relevanceScore: 10,
        keywords: ['TCP/IP', 'protocols', 'internetworking']
      }
    ]
  },
  {
    id: '8',
    title: 'The iPhone Revolution',
    interviewee: 'Steve Jobs',
    company: 'Apple',
    role: 'CEO',
    date: '2007-06-29',
    duration: '25:45',
    summary: 'Steve Jobs discusses the vision behind the iPhone, the convergence of technology, and how it would redefine the mobile phone industry.',
    themes: ['Product Design', 'Innovation', 'Mobile Computing'],
    industry: 'Consumer Electronics',
    decade: '2000s',
    videoUrl: 'https://example.com/video8.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1598327105666-6d36426a0f2b?w=400&h=300&fit=crop'
  },
  {
    id: '9',
    title: 'Engineering at Google Scale',
    interviewee: 'Jeff Dean',
    company: 'Google',
    role: 'Google Senior Fellow',
    date: '2012-09-18',
    duration: '58:20',
    summary: 'Jeff Dean delves into the architecture of Google\'s core systems, including MapReduce, Bigtable, and Spanner, and the challenges of processing petabytes of data.',
    themes: ['Distributed Systems', 'Big Data', 'Scalability'],
    industry: 'Search / Cloud Computing',
    decade: '2010s',
    videoUrl: 'https://example.com/video9.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    transcript: 'Jeff Dean explains the core principles behind Google\'s infrastructure...',
    sections: [
      {
        id: '9.1',
        title: 'MapReduce Explained',
        summary: 'A deep dive into the MapReduce programming model for processing large data sets.',
        startTime: '10:00',
        endTime: '25:00',
        timestamp: 1500,
        relevanceScore: 10,
        keywords: ['MapReduce', 'big data', 'distributed computing']
      },
      {
        id: '9.2',
        title: 'The Philosophy of Scalability',
        summary: 'Dean discusses the design principles for building systems that can scale to billions of users.',
        startTime: '25:00',
        endTime: '45:00',
        timestamp: 2700,
        relevanceScore: 9,
        keywords: ['scalability', 'system design', 'reliability']
      }
    ]
  },
  {
    id: '10',
    title: 'The Business of YouTube',
    interviewee: 'Susan Wojcicki',
    company: 'YouTube',
    role: 'CEO',
    date: '2018-04-02',
    duration: '40:05',
    summary: 'Susan Wojcicki talks about the evolution of YouTube from a video-sharing site to a global media platform, discussing content moderation, monetization, and the creator economy.',
    themes: ['Online Video', 'Creator Economy', 'Platform Strategy'],
    industry: 'Social Media',
    decade: '2010s',
    videoUrl: 'https://example.com/video10.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop'
  },
  {
    id: '11',
    title: 'The GPU and the AI Boom',
    interviewee: 'Jensen Huang',
    company: 'NVIDIA',
    role: 'Founder & CEO',
    date: '2023-03-21',
    duration: '65:30',
    summary: 'Jensen Huang explains how the GPU, originally for graphics, became the engine of the AI revolution, and discusses NVIDIA\'s role in the future of computing.',
    themes: ['Hardware', 'AI', 'GPU Computing'],
    industry: 'Semiconductors',
    decade: '2020s',
    videoUrl: 'https://example.com/video11.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=400&h=300&fit=crop'
  },
  {
    id: '12',
    title: 'Solving Intelligence: The DeepMind Story',
    interviewee: 'Demis Hassabis',
    company: 'DeepMind',
    role: 'Co-Founder & CEO',
    date: '2016-03-15',
    duration: '55:00',
    summary: 'Demis Hassabis discusses the founding of DeepMind, the development of AlphaGo, and the quest to build artificial general intelligence (AGI).',
    themes: ['Artificial Intelligence', 'Reinforcement Learning', 'AGI'],
    industry: 'Artificial Intelligence',
    decade: '2010s',
    videoUrl: 'https://example.com/video12.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    transcript: 'Demis Hassabis shares the journey of DeepMind from a startup to a world-leading AI research lab...',
    sections: [
      {
        id: '12.1',
        title: 'The AlphaGo Challenge',
        summary: 'The story of developing AlphaGo and its historic match against Lee Sedol.',
        startTime: '20:00',
        endTime: '40:00',
        timestamp: 2400,
        relevanceScore: 10,
        keywords: ['AlphaGo', 'Go', 'reinforcement learning']
      },
      {
        id: '12.2',
        title: 'Path to AGI',
        summary: 'Hassabis outlines DeepMind\'s approach and philosophy for achieving Artificial General Intelligence.',
        startTime: '40:00',
        endTime: '55:00',
        timestamp: 3300,
        relevanceScore: 9,
        keywords: ['AGI', 'neuroscience', 'AI research']
      }
    ]
  },
  {
    id: '13',
    title: 'Software for the Moon Landing',
    interviewee: 'Margaret Hamilton',
    company: 'MIT Instrumentation Laboratory',
    role: 'Director of Software Engineering Division',
    date: '1999-07-20',
    duration: '48:15',
    summary: 'Margaret Hamilton reflects on leading the team that developed the onboard flight software for the Apollo missions, pioneering the principles of software engineering.',
    themes: ['Software Engineering', 'Apollo Program', 'NASA'],
    industry: 'Aerospace',
    decade: '1990s',
    videoUrl: 'https://example.com/video13.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?w=400&h=300&fit=crop'
  },
  {
    id: '14',
    title: 'On The Art of Computer Programming',
    interviewee: 'Donald Knuth',
    company: 'Stanford University',
    role: 'Professor Emeritus',
    date: '2005-10-24',
    duration: '75:00',
    summary: 'Donald Knuth discusses his life\'s work, "The Art of Computer Programming," the concept of literate programming, and his passion for algorithmic analysis.',
    themes: ['Computer Science Theory', 'Algorithms', 'Literate Programming'],
    industry: 'Academic Research',
    decade: '2000s',
    videoUrl: 'https://example.com/video14.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1534665482403-a909d0d97c67?w=400&h=300&fit=crop'
  },
  {
    id: '15',
    title: 'Inventing the World Wide Web',
    interviewee: 'Tim Berners-Lee',
    company: 'CERN',
    role: 'Inventor of the WWW',
    date: '1994-08-01',
    duration: '30:25',
    summary: 'Tim Berners-Lee explains the original vision for the World Wide Web, the creation of HTML, HTTP, and URLs, and his hopes for an open, decentralized web.',
    themes: ['World Wide Web', 'Internet History', 'Open Standards'],
    industry: 'Web Technology',
    decade: '1990s',
    videoUrl: 'https://example.com/video15.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop',
    transcript: 'Tim Berners-Lee recounts the story of how the World Wide Web was born at CERN...',
    sections: [
      {
        id: '15.1',
        title: 'The Problem of Information Sharing at CERN',
        summary: 'The initial motivation for creating a new system for linking and sharing documents.',
        startTime: '00:00',
        endTime: '10:00',
        timestamp: 600,
        relevanceScore: 9,
        keywords: ['CERN', 'information management', 'hypertext']
      },
      {
        id: '15.2',
        title: 'Building the First Browser and Server',
        summary: 'Berners-Lee describes the development of the first web browser, WorldWideWeb, and the httpd server.',
        startTime: '10:00',
        endTime: '25:00',
        timestamp: 1500,
        relevanceScore: 10,
        keywords: ['web browser', 'HTTP', 'HTML', 'URL']
      }
    ]
  },
  {
    id: '16',
    title: 'Microsoft\'s Cultural and Cloud Transformation',
    interviewee: 'Satya Nadella',
    company: 'Microsoft',
    role: 'CEO',
    date: '2022-02-04',
    duration: '42:50',
    summary: 'Satya Nadella discusses the cultural shift at Microsoft towards a growth mindset and the strategic pivot to a "cloud-first, mobile-first" world with Azure.',
    themes: ['Cloud Computing', 'Corporate Culture', 'Leadership'],
    industry: 'Enterprise Software',
    decade: '2020s',
    videoUrl: 'https://example.com/video16.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1562813733-b31f71025d54?w=400&h=300&fit=crop'
  },
  {
    id: '17',
    title: 'ImageNet and the AI Data Revolution',
    interviewee: 'Fei-Fei Li',
    company: 'Stanford University',
    role: 'Professor, Co-Director of HAI',
    date: '2019-11-12',
    duration: '39:30',
    summary: 'Dr. Fei-Fei Li talks about the creation of ImageNet, how it catalyzed the deep learning revolution, and the importance of human-centered AI.',
    themes: ['AI', 'Computer Vision', 'Deep Learning'],
    industry: 'Artificial Intelligence',
    decade: '2010s',
    videoUrl: 'https://example.com/video17.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1531746020798-5711c36f94ae?w=400&h=300&fit=crop'
  },
  {
    id: '18',
    title: 'The Dynabook and the Future of Personal Computing',
    interviewee: 'Alan Kay',
    company: 'Xerox PARC',
    role: 'Computer Scientist',
    date: '1989-03-15',
    duration: '50:10',
    summary: 'Alan Kay discusses his visionary "Dynabook" concept, the development of object-oriented programming with Smalltalk, and the principles of graphical user interfaces.',
    themes: ['Personal Computing', 'GUI', 'Object-Oriented Programming'],
    industry: 'Research & Development',
    decade: '1980s',
    videoUrl: 'https://example.com/video18.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1516116216624-53e697300947?w=400&h=300&fit=crop'
  },
  {
    id: '19',
    title: 'The Free Software Movement',
    interviewee: 'Richard Stallman',
    company: 'Free Software Foundation',
    role: 'Founder',
    date: '1998-10-02',
    duration: '68:40',
    summary: 'Richard Stallman explains the philosophy behind the free software movement, the four essential freedoms, and the creation of the GNU project.',
    themes: ['Free Software', 'Open Source', 'Software Ethics'],
    industry: 'Software Development',
    decade: '1990s',
    videoUrl: 'https://example.com/video19.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop'
  },
  {
    id: '20',
    title: 'Convolutional Neural Networks and Deep Learning',
    interviewee: 'Yann LeCun',
    company: 'Meta AI / NYU',
    role: 'Chief AI Scientist',
    date: '2017-05-25',
    duration: '46:55',
    summary: 'Yann LeCun discusses his pioneering work on convolutional neural networks (CNNs), their application in image recognition, and the broader landscape of deep learning.',
    themes: ['Deep Learning', 'Neural Networks', 'Computer Vision'],
    industry: 'Artificial Intelligence',
    decade: '2010s',
    videoUrl: 'https://example.com/video20.mp4',
    thumbnailUrl: 'DISABLEDForWireframe::https://images.unsplash.com/photo-1573496546038-16403570a471?w=400&h=300&fit=crop'
  }
];

export const searchSuggestions = [
  "What are the biggest challenges in cybersecurity today?",
  "How has open source changed the software industry?",
  "What ethical considerations are important in AI development?",
  "How do you scale systems to serve millions of users?",
  "What breakthroughs are happening in quantum computing?"
];
