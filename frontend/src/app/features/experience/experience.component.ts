import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

interface TimelineItem {
  id: string;
  type: 'Personal Project' | 'Academic Project' | 'Academic Education';
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="experience-page">
      <div class="container">
        <!-- Header -->
        <header class="page-header">
          <span class="badge badge-cyan">Projects &amp; Education</span>
          <h1>Experience &amp; Background</h1>
          <p>A transparent breakdown of my full-stack web projects, practical learning, and academic background as a 3rd-year student.</p>
        </header>

        <!-- TIMELINE -->
        <div class="timeline">
          <div *ngFor="let item of timeline" class="timeline-card glass-card">
            <div class="card-top-row">
              <span class="badge badge-cyan">{{ item.type }}</span>
              <span class="period">{{ item.period }}</span>
            </div>

            <div class="role-org-row">
              <h3>{{ item.role }}</h3>
              <span class="org">{{ item.organization }} • {{ item.location }}</span>
            </div>

            <p class="description">{{ item.description }}</p>

            <div class="responsibilities-box">
              <h5>Project Focus &amp; Achievements</h5>
              <ul>
                <li *ngFor="let resp of item.responsibilities">{{ resp }}</li>
              </ul>
            </div>

            <div class="tech-row">
              <span *ngFor="let tech of item.technologies" class="tech-tag">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .experience-page {
      padding: 140px 0 var(--space-16);
    }

    .page-header {
      margin-bottom: var(--space-12);
      max-width: 800px;

      h1 {
        margin: var(--space-3) 0 var(--space-4);
      }

      p {
        font-size: 1.15rem;
      }
    }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 24px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--border-subtle);

        @media (max-width: 640px) {
          display: none;
        }
      }
    }

    .timeline-card {
      margin-left: 60px;
      padding: var(--space-8);
      position: relative;

      @media (max-width: 640px) {
        margin-left: 0;
        padding: var(--space-6);
      }

      &::before {
        content: '';
        position: absolute;
        left: -44px;
        top: 36px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--bg-primary);
        border: 2px solid var(--accent-cyan);
        box-shadow: 0 0 10px var(--accent-cyan);

        @media (max-width: 640px) {
          display: none;
        }
      }

      .card-top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-3);

        .period {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
      }

      .role-org-row {
        margin-bottom: var(--space-3);

        h3 {
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .org {
          font-size: 0.95rem;
          color: var(--accent-teal);
        }
      }

      .description {
        font-size: 1rem;
        margin-bottom: var(--space-4);
      }

      .responsibilities-box {
        background: var(--bg-surface);
        padding: var(--space-4) var(--space-6);
        border-radius: var(--radius-md);
        border: 1px solid var(--border-subtle);
        margin-bottom: var(--space-4);

        h5 {
          margin-bottom: var(--space-2);
          color: var(--accent-cyan);
        }

        ul {
          padding-left: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);

          li {
            font-size: 0.92rem;
            color: var(--text-secondary);
          }
        }
      }

      .tech-row {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);

        .tech-tag {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-secondary);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 2px var(--space-3);
          border-radius: var(--radius-sm);
        }
      }
    }
  `]
})
export class ExperienceComponent implements OnInit {
  private seoService = inject(SeoService);

  timeline: TimelineItem[] = [
    {
      id: 'exp-1',
      type: 'Personal Project',
      role: 'Full Stack Developer',
      organization: 'Qubink — Smart Campus Printing Platform',
      location: 'India',
      period: '2026',
      description: 'Developed Qubink, a web application designed to simplify campus document submission, print parameter selection, and print order management.',
      responsibilities: [
        'Built single-page application user interface using Angular and TypeScript.',
        'Developed backend API endpoints in Java Spring Boot to handle document processing.',
        'Organized relational database schemas in PostgreSQL / Supabase.'
      ],
      technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Supabase']
    },
    {
      id: 'exp-2',
      type: 'Personal Project',
      role: 'Full Stack Developer',
      organization: 'FINOVA & ServiceHub Projects',
      location: 'India',
      period: '2025 — 2026',
      description: 'Created personal finance management (FINOVA) and local service marketplace (ServiceHub) web applications.',
      responsibilities: [
        'Structured RESTful JSON API endpoints for user input validation and data retrieval.',
        'Created interactive dashboard charts for expense summary visualization.',
        'Designed database tables for service booking workflows and transaction records.'
      ],
      technologies: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'PostgreSQL']
    },
    {
      id: 'exp-3',
      type: 'Academic Education',
      role: '3rd-Year Student',
      organization: 'Engineering Institution',
      location: 'India',
      period: '2024 — Present (3rd Year)',
      description: 'Pursuing undergraduate engineering degree focusing on Data Structures & Algorithms, Database Management Systems (DBMS), Object-Oriented Java, and Web Technologies.',
      responsibilities: [
        'Studying core computer science concepts including OOP in Java, SQL database design, and Data Structures.',
        'Participating in software development lab projects and technical hackathons.',
        'Developing full-stack academic project PlacementOS for student preparation tracking.'
      ],
      technologies: ['Java', 'Python', 'C', 'SQL', 'DBMS', 'Web Development']
    }
  ];

  ngOnInit() {
    this.seoService.setPageMeta(
      'Projects & Education Timeline',
      'Timeline of full-stack projects, practical web development work, and 3rd-year computer science education of Manikandan Prabhu.'
    );
  }
}
