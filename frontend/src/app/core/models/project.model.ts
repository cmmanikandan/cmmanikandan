export interface CaseStudySection {
  title: string;
  subtitle?: string;
  content: string[];
  bulletPoints?: string[];
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
}

export interface ArchitectureNode {
  id: string;
  name: string;
  type: 'client' | 'api' | 'service' | 'database' | 'cache' | 'messaging';
  description: string;
  tech: string;
}

export interface UserFlowStep {
  stepNumber: number;
  actor: 'User' | 'System' | 'Database' | 'External Provider';
  action: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  projectSlug: string;
  problem: string;
  context: string;
  goals: string[];
  userFlows: UserFlowStep[];
  architectureNodes: ArchitectureNode[];
  architectureOverview: string;
  keyTechnicalDecisions: {
    title: string;
    decision: string;
    rationale: string;
    tradeoff: string;
  }[];
  challenges: {
    challenge: string;
    solution: string;
  }[];
  learnings: string[];
  interviewHighlights?: string[];
  futureImprovements?: string[];
  nextSteps: string[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  slug: string;
  oneLiner: string;
  category: 'Full Stack' | 'Enterprise Platform' | 'Systems & APIs' | 'Product Architecture';
  role: string;
  timeline: string;
  status: 'Production' | 'Deployed' | 'Completed' | 'In Development';
  featured: boolean;
  technologies: string[];
  thumbnailUrl: string;
  heroImageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  summary: string;
  caseStudy?: CaseStudy;
}
