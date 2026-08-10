export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: 'Java' | 'Spring Boot' | 'Angular' | 'Databases' | 'System Design' | 'Engineering Culture';
  publishedAt: string;
  readTime: string;
  content: string;
  tags: string[];
  featured?: boolean;
}
