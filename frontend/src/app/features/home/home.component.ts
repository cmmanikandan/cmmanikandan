import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';
import { Project } from '../../core/models/project.model';
import { SystemDiagramComponent } from '../../shared/components/system-diagram/system-diagram.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, SystemDiagramComponent, SkeletonLoaderComponent],
  template: `
    <main class="home-page">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-badge-wrap">
            <span class="badge badge-cyan">Full Stack Developer • 3rd-Year B.Tech IT</span>
            <span class="status-indicator">
              <span class="pulse-dot"></span>
              Open to Internships &amp; Campus Placements
            </span>
          </div>

          <h1 class="hero-title">
            Building practical web applications with <span class="text-gradient">Java, Angular &amp; PostgreSQL.</span>
          </h1>

          <p class="hero-description">
            I am <strong>Manikandan Prabhu</strong>, a 3rd-year Information Technology student at <strong>M. Kumarasamy College of Engineering (MKCE), Karur</strong>. I build full-stack web software with structured backend APIs, clean frontend interfaces, and relational databases.
          </p>

          <!-- RECRUITER SNAPSHOT CARD -->
          <div class="recruiter-snapshot-card glass-card reveal-on-scroll">
            <div class="snapshot-header">
              <div class="candidate-title">
                <h3>Manikandan Prabhu</h3>
                <span class="badge badge-cyan">3rd-Year B.Tech IT Student</span>
              </div>
              <span class="institution-tag">MKCE Karur</span>
            </div>

            <div class="snapshot-specs-grid">
              <div class="spec-cell">
                <span class="spec-label">Primary Role</span>
                <span class="spec-val">Full Stack Developer</span>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Academic Status</span>
                <span class="spec-val">3rd Year (Present)</span>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Core Tech Stack</span>
                <span class="spec-val">Java • Spring Boot • Angular • SQL • PostgreSQL</span>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Availability</span>
                <span class="spec-val highlight-emerald">Open to Internships &amp; Campus Placements</span>
              </div>
            </div>

            <div class="snapshot-actions mt-4">
              <a routerLink="/resume" class="btn btn-primary btn-sm">View Resume</a>
              <a routerLink="/work" class="btn btn-secondary btn-sm">View Projects</a>
              <a href="https://github.com/cmmanikandan" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a href="https://linkedin.com/in/manikandanprabhu" target="_blank" rel="noopener" class="btn btn-outline btn-sm">LinkedIn</a>
              <a routerLink="/contact" class="btn btn-outline btn-sm">Contact Me</a>
            </div>
          </div>
        </div>
      </section>

      <!-- FEATURED PROJECTS SHOWCASE -->
      <section class="projects-section">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="badge badge-cyan">Featured Showcase</span>
              <h2>Selected Work</h2>
              <p class="section-sub">End-to-end full-stack applications built with Java, Angular, and PostgreSQL.</p>
            </div>
            <a routerLink="/work" class="btn btn-secondary">
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <!-- SKELETON LOADER STATE -->
          <div *ngIf="loading()" class="skeletons-list">
            <app-skeleton-loader></app-skeleton-loader>
            <app-skeleton-loader></app-skeleton-loader>
          </div>

          <!-- ERROR STATE -->
          <div *ngIf="hasError() && !loading()" class="error-state-card glass-card">
            <h3>Unable to load project data</h3>
            <p>Something went wrong while connecting to the database. You can try reloading or view fallback project details.</p>
            <button class="btn btn-primary btn-sm mt-4" (click)="loadFeaturedProjects()">Try Again</button>
          </div>

          <!-- ALTERNATING EDITORIAL PROJECT CARDS -->
          <div *ngIf="!loading() && !hasError()" class="projects-showcase-list">
            <article 
              *ngFor="let project of featuredProjects(); let i = index" 
              class="editorial-project-card glass-card reveal-on-scroll"
              [class.layout-reverse]="i % 2 !== 0">

              <div class="project-content-side">
                <div class="card-meta">
                  <span class="project-number">{{ project.number }}</span>
                  <span class="badge badge-cyan">{{ project.category }}</span>
                  <span class="status-chip">{{ project.status }}</span>
                </div>

                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-oneliner">"{{ project.oneLiner }}"</p>
                <p class="project-summary">{{ project.summary }}</p>

                <!-- Max 4-5 Tech Chips -->
                <div class="tech-chips-wrap">
                  <span *ngFor="let tech of project.technologies.slice(0, 4)" class="tech-chip">
                    {{ tech }}
                  </span>
                </div>

                <div class="project-actions">
                  <a [routerLink]="['/work', project.slug]" class="btn btn-primary btn-sm">
                    View Case Study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>

                  <a *ngIf="project.githubUrl" [href]="project.githubUrl" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>

                  <a *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
                    Live Demo
                  </a>
                </div>
              </div>

              <!-- VISUAL PREVIEW CONTAINER -->
              <div class="project-visual-side">
                <div class="visual-wrapper">
                  <div class="visual-mockup">
                    <div class="mockup-header">
                      <span class="dot"></span>
                      <span class="dot"></span>
                      <span class="dot"></span>
                      <span class="url-bar">{{ project.slug }}.app</span>
                    </div>
                    <div class="mockup-body">
                      <div class="ui-skeleton-preview">
                        <div class="ui-header-line"></div>
                        <div class="ui-card-grid">
                          <div class="ui-card-item"></div>
                          <div class="ui-card-item"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </article>
          </div>
        </div>
      </section>

      <!-- SYSTEM DIAGRAM SECTION -->
      <section class="diagram-section reveal-on-scroll">
        <div class="container">
          <app-system-diagram></app-system-diagram>
        </div>
      </section>

      <!-- VALUE PILLARS & RECRUITER BENEFITS -->
      <section class="value-pillars-section mt-12">
        <div class="container">
          <h2>What I Bring to a Team</h2>
          <p class="section-sub">Key developer traits and engineering habits I focus on during project development.</p>

          <div class="pillars-grid">
            <div class="pillar-card glass-card">
              <span class="pillar-num">01</span>
              <h4>Problem Solving</h4>
              <p>Breaking down requirements into clean, manageable steps and delivering functional web software.</p>
            </div>
            <div class="pillar-card glass-card">
              <span class="pillar-num">02</span>
              <h4>Full Stack Exposure</h4>
              <p>Comfortable working across Angular user interfaces, Spring Boot REST controllers, and PostgreSQL database tables.</p>
            </div>
            <div class="pillar-card glass-card">
              <span class="pillar-num">03</span>
              <h4>Project-Based Learning</h4>
              <p>Building real web applications to solidify concepts rather than relying solely on theoretical study.</p>
            </div>
            <div class="pillar-card glass-card">
              <span class="pillar-num">04</span>
              <h4>Continuous Improvement</h4>
              <p>Actively strengthening Data Structures &amp; Algorithms, Java OOP, and core computer science fundamentals.</p>
            </div>
            <div class="pillar-card glass-card">
              <span class="pillar-num">05</span>
              <h4>Team &amp; Adaptability</h4>
              <p>Eager to learn new tools, follow team guidelines, and adapt to evolving project needs.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- INTERVIEW & PLACEMENT PREPARATION -->
      <section class="prep-section mt-12 reveal-on-scroll">
        <div class="container">
          <div class="prep-card glass-card">
            <div class="prep-content">
              <span class="badge badge-cyan">PLACEMENT &amp; INTERVIEW PREP</span>
              <h2>Core Technical Focus Areas</h2>
              <p>Subject matter and technical concepts I am actively strengthening for technical interview rounds:</p>

              <div class="prep-topics-grid">
                <div class="topic-item">
                  <strong>☕ Java Programming</strong>
                  <span>Object-Oriented Programming (OOP), Collections API, Exception Handling, Core Java syntax.</span>
                </div>
                <div class="topic-item">
                  <strong>⚡ Data Structures &amp; Algorithms</strong>
                  <span>Arrays, Strings, Linked Lists, Stacks, Queues, Searching, and Sorting algorithms.</span>
                </div>
                <div class="topic-item">
                  <strong>🗄️ SQL &amp; Database Management</strong>
                  <span>Relational schema design, SELECT queries, JOINs, Primary/Foreign keys, and Normalization.</span>
                </div>
                <div class="topic-item">
                  <strong>🌐 Web &amp; REST APIs</strong>
                  <span>HTTP methods (GET, POST, PUT, DELETE), RESTful API design, Angular SPA components, Spring Boot API routing.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- COMPANY RECRUITMENT CTA -->
      <section class="recruiter-cta-section mt-12 mb-16">
        <div class="container container-narrow text-center">
          <div class="cta-card glass-card">
            <span class="badge badge-cyan">Recruiter &amp; Placement Contact</span>
            <h2>Interested in discussing internship or placement opportunities?</h2>
            <p>I am eager to contribute to growth-oriented engineering teams. Feel free to review my resume or send a direct message.</p>
            
            <div class="cta-buttons mt-6">
              <a routerLink="/resume" class="btn btn-primary">View Recruiter Resume</a>
              <a routerLink="/contact" class="btn btn-secondary">Get In Touch</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .home-page { padding-top: 140px; }

    .hero-section {
      margin-bottom: var(--space-16);

      .hero-badge-wrap {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        margin-bottom: var(--space-4);
        flex-wrap: wrap;

        .status-indicator {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-size: 0.85rem;
          color: var(--accent-emerald);

          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--accent-emerald);
            box-shadow: 0 0 8px var(--accent-emerald);
          }
        }
      }

      .hero-title {
        margin-bottom: var(--space-6);
        max-width: 960px;

        .text-gradient {
          background: linear-gradient(135deg, var(--text-primary), var(--accent-cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .hero-description {
        font-size: 1.25rem;
        max-width: 800px;
        margin-bottom: var(--space-8);
      }
    }

    .recruiter-snapshot-card {
      padding: var(--space-6) var(--space-8);
      margin-top: var(--space-6);

      .snapshot-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-4);
        border-bottom: 1px solid var(--border-subtle);
        padding-bottom: var(--space-3);

        @media (max-width: 600px) { flex-direction: column; align-items: flex-start; gap: var(--space-2); }

        .candidate-title {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          h3 { font-size: 1.3rem; }
        }
        .institution-tag {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
      }

      .snapshot-specs-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-4);
        margin-bottom: var(--space-4);

        @media (max-width: 868px) { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 480px) { grid-template-columns: 1fr; }

        .spec-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;

          .spec-label {
            font-size: 0.75rem;
            color: var(--text-tertiary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .spec-val {
            font-size: 0.92rem;
            color: var(--text-primary);
            font-weight: 500;

            &.highlight-emerald { color: var(--accent-emerald); }
          }
        }
      }

      .snapshot-actions {
        display: flex;
        gap: var(--space-2);
        flex-wrap: wrap;
      }
    }

    .projects-section {
      margin-bottom: var(--space-16);

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: var(--space-8);

        @media (max-width: 640px) { flex-direction: column; align-items: flex-start; gap: var(--space-4); }

        h2 { margin-top: var(--space-2); }
        .section-sub { margin-top: 2px; }
      }
    }

    .editorial-project-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-8);
      padding: var(--space-8);
      margin-bottom: var(--space-8);

      @media (max-width: 868px) { grid-template-columns: 1fr; gap: var(--space-6); }

      &.layout-reverse {
        .project-content-side { order: 2; }
        .project-visual-side { order: 1; }
        @media (max-width: 868px) {
          .project-content-side { order: 1; }
          .project-visual-side { order: 2; }
        }
      }

      .project-content-side {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .card-meta {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-3);

          .project-number {
            font-family: var(--font-mono);
            color: var(--accent-cyan);
            font-size: 0.85rem;
            font-weight: 600;
          }
          .status-chip {
            font-family: var(--font-mono);
            font-size: 0.78rem;
            color: var(--text-tertiary);
          }
        }

        .project-title { font-size: 1.8rem; margin-bottom: var(--space-1); }
        .project-oneliner { font-style: italic; color: var(--accent-teal); font-size: 0.95rem; margin-bottom: var(--space-3); }
        .project-summary { margin-bottom: var(--space-4); font-size: 0.98rem; }

        .tech-chips-wrap {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
          margin-bottom: var(--space-6);

          .tech-chip {
            font-family: var(--font-mono);
            font-size: 0.78rem;
            color: var(--text-secondary);
            background: var(--bg-surface);
            padding: 3px var(--space-3);
            border-radius: var(--radius-full);
            border: 1px solid var(--border-subtle);

            &:hover {
              border-color: var(--accent-cyan);
              color: var(--accent-cyan);
            }
          }
        }

        .project-actions {
          display: flex;
          gap: var(--space-3);
          flex-wrap: wrap;
        }
      }

      .project-visual-side {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: var(--radius-md);

        .visual-wrapper {
          width: 100%;
          background: var(--bg-secondary);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: var(--space-4);
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);

          &:hover {
            transform: scale(1.02);
          }
        }

        .visual-mockup {
          background: var(--bg-primary);
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
          overflow: hidden;

          .mockup-header {
            background: var(--bg-surface);
            padding: 8px var(--space-3);
            display: flex;
            align-items: center;
            gap: 6px;
            border-bottom: 1px solid var(--border-subtle);

            .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border-medium); }
            .url-bar { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-tertiary); margin-left: var(--space-2); }
          }

          .mockup-body {
            padding: var(--space-6);
            min-height: 140px;

            .ui-header-line { height: 12px; width: 40%; background: var(--border-medium); border-radius: 4px; margin-bottom: var(--space-4); }
            .ui-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }
            .ui-card-item { height: 60px; background: var(--bg-surface); border-radius: 4px; border: 1px solid var(--border-subtle); }
          }
        }
      }
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-4);
      margin-top: var(--space-6);

      @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 640px) { grid-template-columns: 1fr; }

      .pillar-card {
        padding: var(--space-5);
        display: flex;
        flex-direction: column;
        gap: var(--space-2);

        .pillar-num { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600; }
        h4 { font-size: 1.05rem; }
        p { font-size: 0.88rem; }
      }
    }

    .prep-card {
      padding: var(--space-8);
      .prep-topics-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-6);
        margin-top: var(--space-6);

        @media (max-width: 768px) { grid-template-columns: 1fr; }

        .topic-item {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
          background: var(--bg-surface);
          padding: var(--space-4) var(--space-6);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);

          strong { font-size: 1rem; color: var(--text-primary); }
          span { font-size: 0.9rem; color: var(--text-secondary); }
        }
      }
    }

    .error-state-card {
      text-align: center;
      padding: var(--space-8);
      h3 { color: var(--accent-cyan); margin-bottom: var(--space-2); }
    }

    .mt-12 { margin-top: var(--space-12); }
    .mb-16 { margin-bottom: var(--space-16); }
    .mt-4 { margin-top: var(--space-4); }
    .mt-6 { margin-top: var(--space-6); }
    .text-center { text-align: center; }
  `]
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);

  featuredProjects = signal<Project[]>([]);
  loading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  ngOnInit() {
    this.seoService.setPageMeta(
      'Manikandan Prabhu — Full Stack Developer (Angular, Java, PostgreSQL)',
      'Personal technology portfolio and recruiter profile of Manikandan Prabhu, 3rd-year B.Tech Information Technology student at M. Kumarasamy College of Engineering (MKCE), Karur.'
    );

    this.loadFeaturedProjects();
  }

  loadFeaturedProjects() {
    this.loading.set(true);
    this.hasError.set(false);

    this.apiService.getProjects().subscribe({
      next: (projects) => {
        this.featuredProjects.set(projects.slice(0, 3));
        this.loading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.loading.set(false);
      }
    });
  }
}
