import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';
import { Project } from '../../core/models/project.model';
import { Article } from '../../core/models/article.model';
import { SystemDiagramComponent } from '../../shared/components/system-diagram/system-diagram.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, SystemDiagramComponent],
  template: `
    <main class="home-page">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="container hero-container">
          <div class="hero-content">
            <div class="availability-badge">
              <span class="pulse-dot"></span>
              <span>OPEN TO OPPORTUNITIES • Internships • Campus Placements • Entry-Level Roles</span>
            </div>

            <h1 class="hero-title">
              Building practical software <span class="gradient-text">for the real world.</span>
            </h1>

            <p class="hero-subtitle">
              I'm <strong>Manikandan Prabhu</strong>, a 3rd-year Information Technology student at <strong>M. Kumarasamy College of Engineering (MKCE), Karur</strong>, focused on Java, Angular, databases, and modern web application development.
            </p>

            <!-- RECRUITER QUICK ACTIONS -->
            <div class="hero-actions">
              <a routerLink="/work" class="btn btn-primary">
                View Projects
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a routerLink="/resume" class="btn btn-secondary">View Resume</a>
              <a href="https://github.com/Manikandan-Prabhu" target="_blank" rel="noopener noreferrer" class="btn btn-outline">GitHub</a>
              <a href="https://linkedin.com/in/manikandanprabhu" target="_blank" rel="noopener noreferrer" class="btn btn-outline">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      <!-- RECRUITER SNAPSHOT CARD (<20 SECOND VIEW) -->
      <section class="section-container snapshot-section">
        <div class="container">
          <div class="snapshot-card glass-card">
            <div class="snapshot-header">
              <div class="header-tag">
                <span class="badge badge-cyan">RECRUITER SNAPSHOT</span>
                <span class="sub-tag">20-Second Candidate Summary</span>
              </div>
              <span class="status-pill">Placement-Ready</span>
            </div>

            <div class="snapshot-grid">
              <div class="snap-item">
                <span class="snap-label">Candidate Name</span>
                <span class="snap-val">Manikandan Prabhu</span>
              </div>
              <div class="snap-item">
                <span class="snap-label">Primary Role</span>
                <span class="snap-val">Full Stack Developer</span>
              </div>
              <div class="snap-item">
                <span class="snap-label">Academic Status</span>
                <span class="snap-val">3rd-Year Student (B.Tech IT)</span>
              </div>
              <div class="snap-item">
                <span class="snap-label">Institution</span>
                <span class="snap-val">M. Kumarasamy College of Engineering (MKCE), Karur</span>
              </div>
              <div class="snap-item">
                <span class="snap-label">Career Focus</span>
                <span class="snap-val">Java Full Stack Development</span>
              </div>
              <div class="snap-item">
                <span class="snap-label">Primary Tech Stack</span>
                <span class="snap-val highlight">Java • Angular • Spring Boot • SQL</span>
              </div>
              <div class="snap-item">
                <span class="snap-label">Databases</span>
                <span class="snap-val">MySQL • PostgreSQL • Supabase</span>
              </div>
              <div class="snap-item">
                <span class="snap-label">Availability</span>
                <span class="snap-val color-emerald">Internships &amp; Placements</span>
              </div>
            </div>

            <div class="career-objective-box">
              <h5>Career Objective</h5>
              <p>
                "I am seeking opportunities to begin my software development career in a growth-oriented technology team where I can apply my Java, web development, database, and problem-solving skills while learning from experienced engineers and contributing to real-world software products."
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- SYSTEM ARCHITECTURE FLOW VISUALIZER -->
      <section class="section-container">
        <div class="container">
          <app-system-diagram></app-system-diagram>
        </div>
      </section>

      <!-- ALTERNATING ASYMMETRIC EDITORIAL PROJECT SHOWCASE -->
      <section class="section-container">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="section-tag">01 / SELECTED WORK</span>
              <h2>Practical Projects &amp; Web Applications</h2>
            </div>
            <a routerLink="/work" class="view-all-link">
              Explore All Projects ({{ featuredProjects().length }})
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <!-- ASYMMETRICAL EDITORIAL SHOWCASE LIST -->
          <div class="asymmetric-showcase-list">
            <article 
              *ngFor="let project of featuredProjects(); let i = index" 
              class="showcase-item"
              [class.reverse]="i % 2 !== 0">
              
              <!-- TEXT CONTENT BLOCK -->
              <div class="showcase-content">
                <span class="showcase-num">0{{ i + 1 }}</span>
                <div class="showcase-badges">
                  <span class="badge badge-cyan">{{ project.category }}</span>
                  <span class="role-tag">{{ project.role }}</span>
                </div>

                <h3 class="showcase-title">{{ project.title }}</h3>
                <p class="showcase-oneliner">"{{ project.oneLiner }}"</p>
                <p class="showcase-summary">{{ project.summary }}</p>

                <!-- MAIN TECH CHIPS (MAX 4-5) -->
                <div class="showcase-tech">
                  <span *ngFor="let tech of project.technologies.slice(0, 5)" class="tech-chip">{{ tech }}</span>
                </div>

                <div class="showcase-actions">
                  <a [routerLink]="['/work', project.slug]" class="btn btn-primary btn-sm">
                    View Case Study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                  <a *ngIf="project.githubUrl" [href]="project.githubUrl" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
                    GitHub Code
                  </a>
                </div>
              </div>

              <!-- LARGE PROJECT VISUAL PREVIEW AREA -->
              <div class="showcase-visual glass-card">
                <div class="visual-header-bar">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                  <span class="visual-url">https://{{ project.slug }}.app</span>
                </div>
                <div class="visual-body-preview">
                  <div class="abstract-preview-card">
                    <span class="preview-title">{{ project.title }} Preview</span>
                    <span class="preview-sub">{{ project.oneLiner }}</span>
                    <div class="preview-wireframe">
                      <div class="wire-line"></div>
                      <div class="wire-line short"></div>
                      <div class="wire-box"></div>
                    </div>
                  </div>
                </div>
              </div>

            </article>
          </div>
        </div>
      </section>

      <!-- WHAT I BRING (5 VALUE PILLARS) -->
      <section class="section-container bg-surface-section">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="section-tag">02 / CANDIDATE VALUE</span>
              <h2>What I Bring to a Technology Team</h2>
            </div>
          </div>

          <div class="value-grid">
            <div class="value-card glass-card">
              <span class="value-num">01</span>
              <h4>Problem Solving</h4>
              <p>Breaking complex problems into understandable steps and building practical software solutions.</p>
            </div>
            <div class="value-card glass-card">
              <span class="value-num">02</span>
              <h4>Full Stack Exposure</h4>
              <p>Working across Angular frontends, Java Spring Boot backends, and relational database schemas.</p>
            </div>
            <div class="value-card glass-card">
              <span class="value-num">03</span>
              <h4>Project-Based Learning</h4>
              <p>Building real web applications to solidify concepts rather than relying solely on theoretical study.</p>
            </div>
            <div class="value-card glass-card">
              <span class="value-num">04</span>
              <h4>Continuous Improvement</h4>
              <p>Actively strengthening Data Structures &amp; Algorithms, Java OOP, and core computer science topics.</p>
            </div>
            <div class="value-card glass-card">
              <span class="value-num">05</span>
              <h4>Team &amp; Adaptability</h4>
              <p>Eager to learn new tools, follow engineering guidelines, and adapt to team project requirements.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- PLACEMENT & INTERVIEW PREPARATION SECTION -->
      <section class="section-container">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="section-tag">03 / ACADEMIC &amp; INTERVIEW PREP</span>
              <h2>Currently Strengthening Core Computer Science Skills</h2>
            </div>
          </div>

          <div class="prep-grid">
            <div class="prep-card glass-card">
              <div class="prep-icon">☕</div>
              <h4>Java Programming</h4>
              <p>Object-Oriented Programming (OOP) concepts, Collections API, and Java Core fundamentals.</p>
            </div>

            <div class="prep-card glass-card">
              <div class="prep-icon">⚡</div>
              <h4>DSA Fundamentals</h4>
              <p>Arrays, Strings, Linked Lists, Stacks, Queues, Searching, and Sorting algorithms.</p>
            </div>

            <div class="prep-card glass-card">
              <div class="prep-icon">🗄️</div>
              <h4>SQL &amp; DBMS</h4>
              <p>Relational table queries, Joins, Foreign Keys, Normalization, and ACID properties.</p>
            </div>

            <div class="prep-card glass-card">
              <div class="prep-icon">🌐</div>
              <h4>Web &amp; REST APIs</h4>
              <p>HTTP protocols, RESTful JSON routing, Angular components, and Spring Boot API design.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- COMPANY RECRUITMENT CTA -->
      <section class="section-container cta-section">
        <div class="container">
          <div class="cta-card glass-card">
            <h2>Looking for an early-career developer?</h2>
            <p>I am open to internship opportunities, campus placements, and entry-level software development roles.</p>
            <div class="cta-buttons">
              <a routerLink="/resume" class="btn btn-primary">View Resume</a>
              <a routerLink="/contact" class="btn btn-outline">Contact Me</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .hero-section {
      padding: var(--space-24) 0 var(--space-16);
      background: radial-gradient(circle at 50% 20%, rgba(0, 229, 255, 0.08) 0%, transparent 60%);

      @media (max-width: 768px) {
        padding: 120px 0 var(--space-12);
      }
    }

    .hero-content {
      max-width: 860px;
    }

    .availability-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: 6px var(--space-4);
      background: rgba(0, 229, 255, 0.08);
      border: 1px solid rgba(0, 229, 255, 0.2);
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      color: var(--accent-cyan);
      margin-bottom: var(--space-6);

      .pulse-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--accent-cyan);
        box-shadow: 0 0 10px var(--accent-cyan);
      }
    }

    .hero-title {
      margin-bottom: var(--space-6);
      line-height: 1.15;

      .gradient-text {
        background: linear-gradient(135deg, var(--accent-cyan), #ffffff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .hero-subtitle {
      font-size: 1.2rem;
      color: var(--text-secondary);
      margin-bottom: var(--space-8);
      max-width: 760px;
      line-height: 1.7;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      flex-wrap: wrap;

      @media (max-width: 480px) {
        flex-direction: column;
        align-items: stretch;
      }
    }

    .section-container {
      padding: var(--space-16) 0;

      &.bg-surface-section {
        background: var(--bg-secondary);
        border-y: 1px solid var(--border-subtle);
      }
    }

    /* RECRUITER SNAPSHOT CARD */
    .snapshot-card {
      padding: var(--space-8);
      border: 1px solid var(--border-medium);
      background: linear-gradient(180deg, var(--bg-surface), var(--bg-secondary));

      .snapshot-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-6);
        padding-bottom: var(--space-4);
        border-bottom: 1px solid var(--border-subtle);

        .header-tag {
          display: flex;
          align-items: center;
          gap: var(--space-3);

          .sub-tag {
            font-size: 0.82rem;
            color: var(--text-tertiary);
          }
        }

        .status-pill {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--accent-emerald);
          padding: 4px var(--space-3);
          border-radius: var(--radius-full);
        }
      }

      .snapshot-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-6);
        margin-bottom: var(--space-6);

        @media (max-width: 1024px) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 600px) {
          grid-template-columns: 1fr;
        }

        .snap-item {
          display: flex;
          flex-direction: column;
          gap: 4px;

          .snap-label {
            font-size: 0.75rem;
            color: var(--text-tertiary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .snap-val {
            font-size: 0.95rem;
            font-weight: 500;
            color: var(--text-primary);

            &.highlight {
              color: var(--accent-cyan);
            }

            &.color-emerald {
              color: var(--accent-emerald);
            }
          }
        }
      }

      .career-objective-box {
        background: var(--bg-primary);
        padding: var(--space-6);
        border-radius: var(--radius-md);
        border: 1px solid var(--border-subtle);

        h5 {
          font-size: 0.85rem;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: var(--space-2);
        }

        p {
          font-size: 0.98rem;
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      }
    }

    .section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: var(--space-12);

      @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-3);
      }

      .section-tag {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--accent-cyan);
        display: block;
        margin-bottom: var(--space-2);
      }

      .view-all-link {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        font-weight: 600;
        font-size: 0.95rem;
      }
    }

    /* ALTERNATING ASYMMETRIC SHOWCASE */
    .asymmetric-showcase-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-16);
    }

    .showcase-item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-12);
      align-items: center;

      &.reverse {
        grid-template-columns: 1fr 1fr;

        .showcase-content { order: 2; }
        .showcase-visual { order: 1; }
      }

      @media (max-width: 868px) {
        grid-template-columns: 1fr !important;
        gap: var(--space-8);

        .showcase-content { order: 1 !important; }
        .showcase-visual { order: 2 !important; }
      }

      .showcase-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);

        .showcase-num {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-cyan);
        }

        .showcase-badges {
          display: flex;
          align-items: center;
          gap: var(--space-3);

          .role-tag {
            font-size: 0.85rem;
            color: var(--text-tertiary);
          }
        }

        .showcase-title {
          font-size: 2rem;
        }

        .showcase-oneliner {
          font-style: italic;
          color: var(--accent-teal);
          font-size: 1.05rem;
        }

        .showcase-summary {
          font-size: 1rem;
          color: var(--text-secondary);
        }

        .showcase-tech {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin: var(--space-3) 0;

          .tech-chip {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            padding: 3px var(--space-3);
            border-radius: var(--radius-sm);
            color: var(--text-secondary);
          }
        }

        .showcase-actions {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
      }

      .showcase-visual {
        padding: 0;
        overflow: hidden;
        border: 1px solid var(--border-medium);
        background: linear-gradient(180deg, var(--bg-surface), var(--bg-secondary));

        .visual-header-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: var(--space-3) var(--space-4);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-subtle);

          .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            &.red { background: #ef4444; }
            &.yellow { background: #f59e0b; }
            &.green { background: #10b981; }
          }

          .visual-url {
            margin-left: auto;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-tertiary);
          }
        }

        .visual-body-preview {
          padding: var(--space-12);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 240px;

          .abstract-preview-card {
            background: var(--bg-primary);
            border: 1px solid var(--border-subtle);
            padding: var(--space-6);
            border-radius: var(--radius-md);
            width: 100%;
            max-width: 320px;
            text-align: center;
            box-shadow: var(--shadow-md);

            .preview-title {
              font-family: var(--font-heading);
              font-weight: 600;
              font-size: 1.1rem;
              color: var(--accent-cyan);
              display: block;
              margin-bottom: 4px;
            }

            .preview-sub {
              font-size: 0.85rem;
              color: var(--text-tertiary);
              display: block;
              margin-bottom: var(--space-4);
            }

            .preview-wireframe {
              display: flex;
              flex-direction: column;
              gap: var(--space-2);
              align-items: center;

              .wire-line {
                width: 100%;
                height: 8px;
                background: var(--bg-surface);
                border-radius: 4px;

                &.short { width: 60%; }
              }

              .wire-box {
                width: 100%;
                height: 60px;
                background: var(--bg-surface);
                border-radius: 6px;
                margin-top: var(--space-2);
              }
            }
          }
        }
      }
    }

    /* Value Grid */
    .value-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-4);

      @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 640px) { grid-template-columns: 1fr; }

      .value-card {
        padding: var(--space-6);

        .value-num {
          font-family: var(--font-mono);
          font-size: 1.25rem;
          color: var(--accent-cyan);
          display: block;
          margin-bottom: var(--space-2);
        }

        h4 { margin-bottom: var(--space-2); font-size: 1.05rem; }
        p { font-size: 0.9rem; color: var(--text-secondary); }
      }
    }

    /* Prep Grid */
    .prep-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-6);

      @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 600px) { grid-template-columns: 1fr; }

      .prep-card {
        padding: var(--space-6);
        text-align: center;

        .prep-icon { font-size: 2rem; margin-bottom: var(--space-3); }
        h4 { margin-bottom: var(--space-2); }
        p { font-size: 0.9rem; color: var(--text-secondary); }
      }
    }

    /* CTA Banner */
    .cta-card {
      padding: var(--space-12);
      text-align: center;
      background: linear-gradient(135deg, rgba(0, 229, 255, 0.05), rgba(17, 20, 26, 0.95));

      h2 { margin-bottom: var(--space-4); }
      p { max-width: 600px; margin: 0 auto var(--space-8); }
      .cta-buttons { display: flex; justify-content: center; gap: var(--space-4); }
    }
  `]
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);

  featuredProjects = signal<Project[]>([]);

  ngOnInit() {
    this.seoService.setPageMeta(
      'Manikandan Prabhu | Full Stack Developer & Placement Profile',
      'Placement & recruitment profile of Manikandan Prabhu — 3rd-year Information Technology student at M. Kumarasamy College of Engineering (MKCE), Karur, focused on Java, Angular, Spring Boot, and SQL.'
    );

    this.apiService.getProjects().subscribe(projects => {
      this.featuredProjects.set(projects.filter(p => p.featured));
    });
  }
}
