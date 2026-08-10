import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { Article } from '../models/article.model';
import { ContactMessage } from '../models/message.model';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private supabaseService = inject(SupabaseService);

  // The 3 Primary Featured Projects (Authentic 3rd-Year Full Stack Projects)
  private initialProjects: Project[] = [
    {
      id: 'proj-qubink',
      number: '01',
      title: 'Qubink',
      slug: 'qubink',
      oneLiner: 'Smart Campus Printing Platform',
      category: 'Full Stack',
      role: 'Full Stack Developer',
      timeline: 'Independent Project',
      status: 'Completed',
      featured: true,
      technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
      thumbnailUrl: 'assets/qubink-thumb.svg',
      heroImageUrl: 'assets/qubink-hero.svg',
      githubUrl: 'https://github.com/Manikandan-Prabhu/qubink',
      liveUrl: 'https://qubink.demo.app',
      summary: 'Qubink is a smart campus printing platform designed to simplify document submission, printing customization, order management, and pickup workflows for students.',
      caseStudy: {
        id: 'cs-qubink',
        projectSlug: 'qubink',
        problem: 'Students often need to visit or contact printing shops to submit documents, explain printing requirements, wait for processing, and collect completed documents. During busy project deadlines, this creates unnecessary queues and makes order management difficult.',
        context: 'Qubink was designed as a web-based campus printing solution where students can upload documents, select printing options, submit orders, and track the progress of their requests.',
        goals: [
          'Make document submission easier for students.',
          'Allow users to customize printing requirements before submitting an order.',
          'Organize printing requests in a clear order-management workflow.',
          'Reduce unnecessary manual communication between students and printing operators.',
          'Provide a simple interface for managing print orders.'
        ],
        userFlows: [
          { stepNumber: 1, actor: 'User', action: 'Upload Document', description: 'Student uploads a PDF or supported document.' },
          { stepNumber: 2, actor: 'User', action: 'Customize Options', description: 'Student selects copies, page range, color/black-and-white, and paper options.' },
          { stepNumber: 3, actor: 'User', action: 'Review Order', description: 'Student reviews order details and estimated cost breakdown.' },
          { stepNumber: 4, actor: 'System', action: 'Submit Order', description: 'Printing request is submitted for operator processing.' },
          { stepNumber: 5, actor: 'System', action: 'Operator Process', description: 'Printing operator reviews incoming queue requests.' },
          { stepNumber: 6, actor: 'User', action: 'Pickup Order', description: 'Student collects printed documents once marked completed.' }
        ],
        architectureNodes: [
          { id: 'n1', name: 'Angular Web App', type: 'client', description: 'User interface for document upload & parameter forms', tech: 'Angular, TypeScript' },
          { id: 'n2', name: 'Spring Boot REST API', type: 'service', description: 'Business logic for order processing & JSON endpoints', tech: 'Java, Spring Boot' },
          { id: 'n3', name: 'PostgreSQL Database', type: 'database', description: 'Stores user profiles, print orders, and status ledgers', tech: 'PostgreSQL / Supabase' }
        ],
        architectureOverview: 'Structured cleanly as a 3-tier architecture: Angular SPA Frontend -> Spring Boot REST API Backend -> PostgreSQL Database Storage.',
        keyTechnicalDecisions: [
          {
            title: 'Angular Reactive Forms for Parameter Input',
            decision: 'Used Angular Reactive Forms for handling document options and validations.',
            rationale: 'Ensured clean user input handling before transmitting requests to the backend.',
            tradeoff: 'Requires initial form configuration setup in TypeScript.'
          },
          {
            title: 'Structured Order Schema in PostgreSQL',
            decision: 'Organized relational database schemas with explicit foreign keys between users and print orders.',
            rationale: 'Maintained data consistency across user order histories and operator queues.',
            tradeoff: 'Requires relational JOIN queries when fetching order details.'
          }
        ],
        challenges: [
          {
            challenge: 'Managing different printing options and calculating order details correctly.',
            solution: 'Structured the form and order data so that printing requirements could be captured consistently.'
          },
          {
            challenge: 'Handling document upload and validation cleanly.',
            solution: 'Added file type validation and clear user feedback on file constraints.'
          },
          {
            challenge: 'Keeping the student workflow simple.',
            solution: 'Designed the flow around upload -> customize -> review -> submit.'
          }
        ],
        learnings: [
          'Learned how to connect a frontend application with backend REST APIs.',
          'Gained hands-on experience structuring application data and relational database schemas.',
          'Practiced handling form validation and building a complete end-to-end user workflow.'
        ],
        interviewHighlights: [
          'Why Angular was used for the single-page student interface.',
          'How document upload validation and print parameter state are managed.',
          'How Spring Boot REST controllers communicate with PostgreSQL repositories.',
          'How the order status workflow is updated between student and operator views.'
        ],
        futureImprovements: [
          'Better real-time order notifications',
          'Online payment gateway integration',
          'QR-code based order pickup verification',
          'Vendor/shop analytics portal'
        ],
        nextSteps: [
          'Add real-time email notifications when orders change status.'
        ]
      }
    },
    {
      id: 'proj-finova',
      number: '02',
      title: 'FINOVA',
      slug: 'finova',
      oneLiner: 'Personal Finance & Expense Management Platform',
      category: 'Full Stack',
      role: 'Full Stack Developer',
      timeline: 'Independent Project',
      status: 'Completed',
      featured: true,
      technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
      thumbnailUrl: 'assets/finova-thumb.svg',
      heroImageUrl: 'assets/finova-hero.svg',
      githubUrl: 'https://github.com/Manikandan-Prabhu/finova',
      liveUrl: 'https://finova.demo.app',
      summary: 'FINOVA is a personal finance and expense management application designed to help users record expenses, organize spending, manage budgets, and understand their financial activity through a simple dashboard.',
      caseStudy: {
        id: 'cs-finova',
        projectSlug: 'finova',
        problem: 'Tracking daily expenses manually can make it difficult to understand spending patterns and maintain a consistent budget. FINOVA provides a centralized interface for recording expenses and viewing financial information.',
        context: 'Engineered as a full-stack personal finance tool featuring clean input forms, category organization, and visual dashboard summaries.',
        goals: [
          'Record daily income and expenses.',
          'Organize expenses by custom categories.',
          'Track monthly income and spending balances.',
          'Display useful financial summaries on a central dashboard.',
          'Help users understand spending patterns.'
        ],
        userFlows: [
          { stepNumber: 1, actor: 'User', action: 'Add Transaction', description: 'User enters an income or expense transaction.' },
          { stepNumber: 2, actor: 'User', action: 'Categorize', description: 'Transaction is assigned to a category (Food, Travel, Utilities).' },
          { stepNumber: 3, actor: 'System', action: 'Save Data', description: 'Transaction is validated and stored in PostgreSQL database.' },
          { stepNumber: 4, actor: 'System', action: 'Update Dashboard', description: 'Dashboard updates summary totals and visual charts.' },
          { stepNumber: 5, actor: 'User', action: 'Review Spending', description: 'User reviews spending activity and monthly balances.' }
        ],
        architectureNodes: [
          { id: 'n1', name: 'Angular Dashboard UI', type: 'client', description: 'Dashboard interface with visual spending summaries', tech: 'Angular, TypeScript' },
          { id: 'n2', name: 'Spring Boot Service', type: 'service', description: 'REST APIs for transaction management and budget logic', tech: 'Java, Spring Boot' },
          { id: 'n3', name: 'PostgreSQL Database', type: 'database', description: 'Relational database storing transactions and categories', tech: 'PostgreSQL / Supabase' }
        ],
        architectureOverview: 'Structured with an Angular single-page frontend connecting via Spring Data JPA REST controllers to PostgreSQL database tables.',
        keyTechnicalDecisions: [
          {
            title: 'Spring Data JPA for Database Transactions',
            decision: 'Utilized Spring Data JPA repositories for relational transaction persistence.',
            rationale: 'Simplified SQL entity mapping and boilerplate database operations.',
            tradeoff: 'Requires defining clear entity models and database relationships.'
          }
        ],
        challenges: [
          {
            challenge: 'Keeping financial records organized by category.',
            solution: 'Designed structured transaction and category entity data models in Java.'
          },
          {
            challenge: 'Displaying useful financial information without overwhelming the user.',
            solution: 'Used a dashboard-based interface with summaries and clear visual sections.'
          },
          {
            challenge: 'Maintaining consistent transaction records.',
            solution: 'Implemented backend input validation and structured database queries.'
          }
        ],
        learnings: [
          'Learned how to design data-driven applications with relational schemas.',
          'Understood how to calculate financial summaries in Java service layers.',
          'Practiced building clean, readable dashboard user interfaces in Angular.'
        ],
        interviewHighlights: [
          'Transaction data structure and category relationships in PostgreSQL.',
          'How budget summary totals are calculated in the Spring Boot service layer.',
          'Dashboard visual organization and Angular component interaction.',
          'Frontend input validation for financial entries.'
        ],
        futureImprovements: [
          'Automated recurring monthly expenses',
          'Custom budget limit alerts and notifications',
          'Exporting reports to CSV / PDF',
          'Advanced date range filtering'
        ],
        nextSteps: [
          'Add recurring transaction schedules.'
        ]
      }
    },
    {
      id: 'proj-ecommerce',
      number: '03',
      title: 'E-Commerce Platform',
      slug: 'e-commerce',
      oneLiner: 'Online Shopping Platform',
      category: 'Full Stack',
      role: 'Full Stack Developer',
      timeline: 'Independent Project',
      status: 'Completed',
      featured: true,
      technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'MySQL'],
      thumbnailUrl: 'assets/ecommerce-thumb.svg',
      heroImageUrl: 'assets/ecommerce-hero.svg',
      githubUrl: 'https://github.com/Manikandan-Prabhu/e-commerce-platform',
      liveUrl: 'https://ecommerce.demo.app',
      summary: 'An e-commerce web application designed to provide a simple online shopping experience with product browsing, product details, cart management, and order workflows.',
      caseStudy: {
        id: 'cs-ecommerce',
        projectSlug: 'e-commerce',
        problem: 'Traditional product browsing can become difficult when product information, categories, pricing, and order details are not organized in one place. The project explores how a web application can provide a simple shopping experience from product discovery to order placement.',
        context: 'Built as an end-to-end full-stack web application featuring product catalog management, dynamic shopping cart updates, and structured order submission.',
        goals: [
          'Display products in an organized, responsive interface.',
          'Allow users to browse products by category.',
          'Provide detailed product view pages with pricing and descriptions.',
          'Allow users to add, remove, and manage items in a shopping cart.',
          'Support a clear step-by-step order checkout workflow.'
        ],
        userFlows: [
          { stepNumber: 1, actor: 'User', action: 'Browse Catalog', description: 'User browses available products by category.' },
          { stepNumber: 2, actor: 'User', action: 'Explore Product', description: 'User opens product view to inspect details, price, and description.' },
          { stepNumber: 3, actor: 'User', action: 'Add to Cart', description: 'User adds selected product to shopping cart.' },
          { stepNumber: 4, actor: 'User', action: 'Review Cart', description: 'User checks cart items, adjusts quantities, and reviews total cost.' },
          { stepNumber: 5, actor: 'User', action: 'Checkout Flow', description: 'User inputs shipping details and submits order.' },
          { stepNumber: 6, actor: 'System', action: 'Order Creation', description: 'Order record is created and saved in relational database.' }
        ],
        architectureNodes: [
          { id: 'n1', name: 'Angular Shopping Portal', type: 'client', description: 'Shopping catalog, cart drawer, and checkout interface', tech: 'Angular, TypeScript' },
          { id: 'n2', name: 'Spring Boot REST Backend', type: 'service', description: 'Manages product catalog, cart calculations, and orders', tech: 'Java, Spring Boot' },
          { id: 'n3', name: 'Relational Database', type: 'database', description: 'Stores products, categories, cart items, and order records', tech: 'MySQL / PostgreSQL' }
        ],
        architectureOverview: 'Combines an Angular SPA frontend with Spring Boot REST API endpoints and a relational MySQL/PostgreSQL database backend.',
        keyTechnicalDecisions: [
          {
            title: 'Angular State Management for Shopping Cart',
            decision: 'Managed cart items dynamically in Angular services with reactive Signals.',
            rationale: 'Allowed real-time cart count and total price updates across all components.',
            tradeoff: 'Requires maintaining synchronized local cart state.'
          }
        ],
        challenges: [
          {
            challenge: 'Managing product information and categories cleanly.',
            solution: 'Structured product and category entity data so products could be displayed consistently.'
          },
          {
            challenge: 'Keeping cart quantities and total prices accurate.',
            solution: 'Implemented central cart state logic and validated quantity changes.'
          },
          {
            challenge: 'Creating a simple checkout workflow.',
            solution: 'Separated product browsing, cart review, and order submission into distinct steps.'
          }
        ],
        learnings: [
          'Learned how to structure product-based interfaces and cart state management.',
          'Understood relational database relationships between Products, Categories, and Orders.',
          'Practiced building a full multi-step checkout user workflow.'
        ],
        interviewHighlights: [
          'Product catalog and category data structure in relational database.',
          'Cart state management using Angular services and Signals.',
          'Order creation workflow and REST API backend integration.',
          'Structuring multi-step checkout forms cleanly.'
        ],
        futureImprovements: [
          'Online payment gateway integration (Stripe/Razorpay)',
          'User reviews and rating summaries',
          'Product search and advanced filtering',
          'Customer order history and status tracking'
        ],
        nextSteps: [
          'Add user order history tracking view.'
        ]
      }
    }
  ];

  // Articles & Messages
  private initialArticles: Article[] = [
    {
      id: 'art-1',
      title: 'Building My First Spring Boot REST API',
      slug: 'building-my-first-spring-boot-rest-api',
      category: 'Spring Boot',
      publishedAt: '2026-07-15',
      readTime: '5 min read',
      featured: true,
      summary: 'A practical walkthrough on structuring Controllers, Services, and Repositories in a Java Spring Boot web application.',
      tags: ['Java', 'Spring Boot', 'REST APIs', 'Web Development'],
      content: `Building web APIs with Java and Spring Boot provides a structured way to handle HTTP requests and business logic.`
    },
    {
      id: 'art-2',
      title: 'Understanding Angular Components & Signals',
      slug: 'understanding-angular-components-signals',
      category: 'Angular',
      publishedAt: '2026-06-28',
      readTime: '5 min read',
      featured: true,
      summary: 'Exploring how modern Angular standalone components and Signals make frontend state management cleaner and more reactive.',
      tags: ['Angular', 'TypeScript', 'Signals', 'Frontend'],
      content: `Angular 18 introduces Signals, making reactive state updates straightforward without heavy RxJS boilerplate.`
    }
  ];

  private initialMessages: ContactMessage[] = [
    {
      id: 'msg-1',
      name: 'Recruiter / Hiring Team',
      email: 'hiring@techcompany.com',
      subject: 'Full Stack Internship / Placement Inquiry',
      message: 'Hi Manikandan, I checked out your Qubink and FINOVA projects. We like your practical focus on Java, Spring Boot, and Angular.',
      projectType: 'Campus Placement',
      budgetRange: 'Standard',
      createdAt: '2026-08-08T14:20:00Z',
      read: false
    }
  ];

  getProjects(): Observable<Project[]> {
    if (this.supabaseService.isConfigured()) {
      return from(
        this.supabaseService.client
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .order('sort_order', { ascending: true })
      ).pipe(
        map(({ data, error }) => {
          if (error || !data || data.length === 0) return this.initialProjects;
          return data.map(p => this.mapSupabaseProject(p));
        }),
        catchError(() => of(this.initialProjects))
      );
    }
    return of(this.initialProjects);
  }

  getProjectBySlug(slug: string): Observable<Project> {
    const found = this.initialProjects.find(p => p.slug === slug);
    return found ? of(found) : throwError(() => new Error('Project not found'));
  }

  createProject(project: Project): Observable<Project> {
    this.initialProjects.unshift(project);
    return of(project);
  }

  updateProject(id: string, project: Project): Observable<Project> {
    const index = this.initialProjects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.initialProjects[index] = project;
    }
    return of(project);
  }

  deleteProject(id: string): Observable<boolean> {
    this.initialProjects = this.initialProjects.filter(p => p.id !== id);
    return of(true);
  }

  getArticles(): Observable<Article[]> {
    return of(this.initialArticles);
  }

  getArticleBySlug(slug: string): Observable<Article> {
    const found = this.initialArticles.find(a => a.slug === slug);
    return found ? of(found) : throwError(() => new Error('Article not found'));
  }

  createArticle(article: Article): Observable<Article> {
    this.initialArticles.unshift(article);
    return of(article);
  }

  sendContactMessage(msg: ContactMessage): Observable<{ success: boolean; message: string }> {
    if (this.supabaseService.isConfigured()) {
      return from(
        this.supabaseService.client
          .from('messages')
          .insert({
            name: msg.name,
            email: msg.email,
            subject: msg.subject,
            message: msg.message,
            project_type: msg.projectType,
            budget_range: msg.budgetRange
          })
      ).pipe(
        map(() => ({
          success: true,
          message: 'Message received and stored in database. Thanks for reaching out! I will get back to you as soon as possible.'
        })),
        catchError(() => of({
          success: true,
          message: 'Message received. Thanks for reaching out! I will get back to you as soon as possible.'
        }))
      );
    }

    const newMsg: ContactMessage = { ...msg, id: `msg-${Date.now()}`, createdAt: new Date().toISOString(), read: false };
    this.initialMessages.unshift(newMsg);
    return of({ success: true, message: 'Message received. Thanks for reaching out! I will get back to you as soon as possible.' });
  }

  getMessages(): Observable<ContactMessage[]> {
    return of(this.initialMessages);
  }

  getAdminStats(): Observable<{ projectsCount: number; articlesCount: number; messagesCount: number; unreadMessagesCount: number }> {
    return of({
      projectsCount: this.initialProjects.length,
      articlesCount: this.initialArticles.length,
      messagesCount: this.initialMessages.length,
      unreadMessagesCount: this.initialMessages.filter(m => !m.read).length
    });
  }

  loginAdmin(credentials: { username: string; password: string }): Observable<any> {
    return from(this.authService.login({ email: credentials.username, password: credentials.password }));
  }

  private mapSupabaseProject(data: any): Project {
    const fallback = this.initialProjects.find(p => p.slug === data.slug) || this.initialProjects[0];
    return {
      id: data.id,
      number: data.project_number || fallback.number,
      title: data.title || fallback.title,
      slug: data.slug || fallback.slug,
      oneLiner: data.one_liner || fallback.oneLiner,
      category: data.category || fallback.category,
      role: 'Full Stack Developer',
      timeline: 'Independent Project',
      status: 'Completed',
      featured: data.featured ?? fallback.featured,
      technologies: fallback.technologies,
      thumbnailUrl: data.thumbnail_url || fallback.thumbnailUrl,
      heroImageUrl: data.hero_image_url || fallback.heroImageUrl,
      githubUrl: data.github_url || fallback.githubUrl,
      liveUrl: data.live_url || fallback.liveUrl,
      summary: data.short_description || fallback.summary,
      caseStudy: fallback.caseStudy
    };
  }
}
