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
      
      <!-- 01 — HERO SECTION -->
      <section class="hero-section">
        <div class="container hero-grid">
          
          <div class="hero-text-content">
            <div class="hero-label-wrap">
              <span class="badge badge-cyan">3RD-YEAR INFORMATION TECHNOLOGY STUDENT</span>
              <span class="status-indicator">
                <span class="pulse-dot"></span>
                Open to Internships &amp; Placement Opportunities
              </span>
            </div>

            <h1 class="hero-title">
              Building practical software for the <span class="text-gradient">real world.</span>
            </h1>

            <p class="hero-description">
              I'm <strong>Manikandan Prabhu</strong>, a Full Stack Developer focused on Java, web development, databases, and building practical digital products.
            </p>

            <p class="hero-subtext">
              Currently strengthening my skills in Java, Data Structures &amp; Algorithms, SQL, and full-stack application development.
            </p>

            <div class="hero-cta-group">
              <a routerLink="/work" class="btn btn-primary">
                View My Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a routerLink="/resume" class="btn btn-secondary">
                View Resume
              </a>
            </div>
          </div>

          <!-- 02 — HERO ANIMATED VISUAL -->
          <div class="hero-visual-content">
            <div class="floating-app-window glass-card">
              <div class="window-topbar">
                <div class="dots-group">
                  <span class="dot dot-red"></span>
                  <span class="dot dot-amber"></span>
                  <span class="dot dot-green"></span>
                </div>
                <div class="active-tab-bar">
                  <span class="tab active">Qubink.app</span>
                  <span class="tab">FINOVA.app</span>
                  <span class="tab">E-Commerce.app</span>
                </div>
              </div>

              <div class="window-body">
                <div class="app-tech-header">
                  <span class="badge badge-cyan">Java 17</span>
                  <span class="badge badge-cyan">Angular 18</span>
                  <span class="badge badge-cyan">Spring Boot</span>
                  <span class="badge badge-cyan">PostgreSQL</span>
                </div>

                <div class="app-ui-preview">
                  <div class="preview-row hero-row"></div>
                  <div class="preview-cards-grid">
                    <div class="preview-card-item"></div>
                    <div class="preview-card-item"></div>
                  </div>
                </div>

                <div class="floating-status-pill">
                  <span class="pill-dot"></span>
                  <span>REST APIs Active • Database Connected</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- 03 — RECRUITER SNAPSHOT -->
      <section class="snapshot-section container">
        <div class="recruiter-snapshot-card glass-card reveal-on-scroll">
          <div class="snapshot-header">
            <div>
              <span class="badge badge-cyan">RECRUITER SNAPSHOT</span>
              <h3>Manikandan Prabhu</h3>
            </div>
            <span class="institution-tag">M. Kumarasamy College of Engineering (MKCE), Karur</span>
          </div>

          <div class="snapshot-grid">
            <div class="spec-cell">
              <span class="label">Current Status</span>
              <span class="val">3rd-Year B.Tech IT Student</span>
            </div>
            <div class="spec-cell">
              <span class="label">Role</span>
              <span class="val">Full Stack Developer</span>
            </div>
            <div class="spec-cell">
              <span class="label">Primary Focus</span>
              <span class="val">Java Full Stack Development</span>
            </div>
            <div class="spec-cell">
              <span class="label">Looking For</span>
              <span class="val highlight-emerald">Internships • Campus Placements • Entry-Level Roles</span>
            </div>
            <div class="spec-cell">
              <span class="label">Location</span>
              <span class="val">Karur / Tamil Nadu, India</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 04 — QUICK STATS -->
      <section class="quick-stats-section container mt-8">
        <div class="stats-grid">
          <div class="stat-card glass-card">
            <span class="stat-number">03</span>
            <span class="stat-label">Featured Projects</span>
          </div>
          <div class="stat-card glass-card">
            <span class="stat-number">01</span>
            <span class="stat-label">Primary Direction (Java Full Stack)</span>
          </div>
          <div class="stat-card glass-card">
            <span class="stat-number">03rd</span>
            <span class="stat-label">Academic Year (Present)</span>
          </div>
          <div class="stat-card glass-card">
            <span class="stat-number">∞</span>
            <span class="stat-label">Continuous Learning</span>
          </div>
        </div>
      </section>

      <!-- 05 — FEATURED PROJECTS SHOWCASE -->
      <section class="projects-section mt-16">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="badge badge-cyan">PORTFOLIO SHOWCASE</span>
              <h2>Selected Work</h2>
              <p class="section-sub">A few projects where I applied programming, web development, database design, and problem-solving skills to build complete applications.</p>
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

          <!-- ALTERNATING EDITORIAL PROJECT CARDS -->
          <div *ngIf="!loading()" class="projects-showcase-list">
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
                    View GitHub
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

      <!-- 07 — WHY THESE PROJECTS MATTER -->
      <section class="why-matters-section mt-16 container">
        <div class="matters-card glass-card reveal-on-scroll">
          <span class="badge badge-cyan">DEVELOPMENT PHILOSOPHY</span>
          <h2>Built to Learn by Building</h2>
          <p class="matters-lead">
            "These projects are more than interface exercises. Each one helped me understand how frontend applications, backend APIs, databases, authentication, and real user workflows come together."
          </p>

          <div class="matters-pillars-grid">
            <div class="matter-pillar">
              <span class="pillar-icon">💻</span>
              <h4>Frontend UI</h4>
              <p>Designing responsive single-page interfaces in Angular with clean user input forms.</p>
            </div>
            <div class="matter-pillar">
              <span class="pillar-icon">⚙️</span>
              <h4>Backend APIs</h4>
              <p>Structuring Java Spring Boot REST controllers for business logic and data processing.</p>
            </div>
            <div class="matter-pillar">
              <span class="pillar-icon">🗄️</span>
              <h4>Databases</h4>
              <p>Designing relational database tables in PostgreSQL &amp; MySQL with explicit primary/foreign keys.</p>
            </div>
            <div class="matter-pillar">
              <span class="pillar-icon">⚡</span>
              <h4>User Experience</h4>
              <p>Creating straightforward workflows around user actions (upload, customize, submit, review).</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 08 — TECHNICAL FOUNDATION -->
      <section class="tech-foundation-section mt-16 container">
        <span class="badge badge-cyan">TECHNICAL FOUNDATION</span>
        <h2>Technical Foundation</h2>
        <p class="section-sub">I focus on building strong fundamentals before moving into advanced technologies.</p>

        <div class="foundation-groups-grid mt-6">
          <div class="group-card glass-card">
            <h4>Languages</h4>
            <div class="tech-tags">
              <span>Java</span><span>Python</span><span>C</span><span>JavaScript</span><span>TypeScript</span><span>SQL</span>
            </div>
          </div>

          <div class="group-card glass-card">
            <h4>Frontend</h4>
            <div class="tech-tags">
              <span>HTML</span><span>CSS</span><span>JavaScript</span><span>TypeScript</span><span>Angular</span>
            </div>
          </div>

          <div class="group-card glass-card">
            <h4>Backend</h4>
            <div class="tech-tags">
              <span>Java Core</span><span>Spring Boot</span><span>REST APIs</span>
            </div>
          </div>

          <div class="group-card glass-card">
            <h4>Database</h4>
            <div class="tech-tags">
              <span>MySQL</span><span>PostgreSQL</span><span>Supabase</span>
            </div>
          </div>

          <div class="group-card glass-card">
            <h4>Tools</h4>
            <div class="tech-tags">
              <span>Git</span><span>GitHub</span><span>VS Code</span><span>Postman</span><span>Figma</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 09 — CURRENTLY IMPROVING (ZERO FAKE PERCENTAGES) -->
      <section class="improving-section mt-16 container reveal-on-scroll">
        <span class="badge badge-cyan">SKILLS IN PROGRESS</span>
        <h2>Currently Improving</h2>
        <p class="section-sub">Subject areas and core CS topics I am actively practicing and strengthening:</p>

        <div class="improving-grid mt-6">
          <div class="improving-item glass-card">
            <span class="topic-name">Java OOP &amp; Core Syntax</span>
            <span class="status-tag tag-strengthening">Strengthening</span>
          </div>
          <div class="improving-item glass-card">
            <span class="topic-name">Data Structures &amp; Algorithms</span>
            <span class="status-tag tag-practicing">Practicing</span>
          </div>
          <div class="improving-item glass-card">
            <span class="topic-name">Problem Solving &amp; Logic</span>
            <span class="status-tag tag-practicing">Practicing</span>
          </div>
          <div class="improving-item glass-card">
            <span class="topic-name">SQL Queries &amp; DBMS</span>
            <span class="status-tag tag-strengthening">Strengthening</span>
          </div>
          <div class="improving-item glass-card">
            <span class="topic-name">Object-Oriented Design</span>
            <span class="status-tag tag-learning">Currently Learning</span>
          </div>
          <div class="improving-item glass-card">
            <span class="topic-name">Full Stack Development</span>
            <span class="status-tag tag-strengthening">Strengthening</span>
          </div>
          <div class="improving-item glass-card">
            <span class="topic-name">Computer Networks</span>
            <span class="status-tag tag-learning">Currently Learning</span>
          </div>
          <div class="improving-item glass-card">
            <span class="topic-name">Operating Systems Basics</span>
            <span class="status-tag tag-learning">Currently Learning</span>
          </div>
        </div>
      </section>

      <!-- 10 — PLACEMENT SECTION -->
      <section class="placement-section mt-16 container reveal-on-scroll">
        <div class="placement-card glass-card">
          <span class="badge badge-cyan">PLACEMENT PREPARATION</span>
          <h2>Preparing for the Next Opportunity</h2>
          <p class="placement-lead">
            I'm currently preparing for software development placements and internships by strengthening Java, DSA, SQL, database concepts, and full-stack development.
          </p>

          <div class="prep-chips-row">
            <span>Java OOP</span><span>Data Structures</span><span>Algorithms</span><span>SQL Queries</span><span>DBMS</span><span>Web APIs</span>
          </div>

          <div class="placement-actions mt-6">
            <a routerLink="/resume" class="btn btn-primary">View Resume →</a>
            <a routerLink="/contact" class="btn btn-secondary">Let's Connect →</a>
          </div>
        </div>
      </section>

      <!-- 11 — WHAT I BRING -->
      <section class="what-i-bring-section mt-16 container">
        <h2>What I Bring</h2>
        <div class="pillars-grid mt-6">
          <div class="pillar-card glass-card">
            <span class="pillar-num">01</span>
            <h4>Problem Solving</h4>
            <p>Breaking problems into smaller steps and building practical software solutions.</p>
          </div>
          <div class="pillar-card glass-card">
            <span class="pillar-num">02</span>
            <h4>Project Experience</h4>
            <p>Learning through complete web applications rather than isolated tutorials.</p>
          </div>
          <div class="pillar-card glass-card">
            <span class="pillar-num">03</span>
            <h4>Full Stack Understanding</h4>
            <p>Working across Angular frontend UI, Spring Boot backend APIs, and PostgreSQL databases.</p>
          </div>
          <div class="pillar-card glass-card">
            <span class="pillar-num">04</span>
            <h4>Continuous Learning</h4>
            <p>Actively strengthening programming and core computer science fundamentals.</p>
          </div>
        </div>
      </section>

      <!-- 12 & 13 — EDUCATION & CAREER DIRECTION -->
      <section class="edu-career-section mt-16 container">
        <div class="edu-career-grid">
          
          <div class="edu-card glass-card">
            <span class="badge badge-cyan">EDUCATION</span>
            <h3>B.Tech Information Technology</h3>
            <p class="inst-name">M. Kumarasamy College of Engineering (MKCE), Karur</p>
            <div class="edu-status-badge mt-4">
              <span>Current Status:</span> <strong>3rd Year (Present)</strong>
            </div>
          </div>

          <div class="career-card glass-card">
            <span class="badge badge-cyan">CAREER DIRECTION</span>
            <h3>Where I'm Heading</h3>
            <p class="career-desc">
              My current career direction is Java Full Stack Development, with a strong interest in building web applications and learning how production software is designed and maintained.
            </p>
            <div class="career-chips">
              <span>Java Development</span><span>Full Stack</span><span>Backend APIs</span><span>Web Applications</span>
            </div>
          </div>

        </div>
      </section>

      <!-- 14 — RECRUITER CTA -->
      <section class="recruiter-cta-section mt-16 container container-narrow text-center">
        <div class="cta-card glass-card reveal-on-scroll">
          <span class="badge badge-cyan">RECRUITMENT &amp; HIRING</span>
          <h2>Looking for an early-career developer?</h2>
          <p>I'm open to internships, campus placements, and entry-level software development opportunities.</p>
          
          <div class="cta-buttons mt-6">
            <a routerLink="/resume" class="btn btn-primary">View Resume</a>
            <a routerLink="/contact" class="btn btn-secondary">Contact Me</a>
          </div>
        </div>
      </section>

      <!-- 15 — CONTACT PREVIEW -->
      <section class="contact-preview-section mt-16 mb-16 container text-center">
        <h2>Let's Connect</h2>
        <p class="contact-sub">If you are a recruiter, developer, company, or someone interested in my work, I'd be happy to connect.</p>

        <div class="social-links-row mt-6">
          <a href="https://github.com/cmmanikandan" target="_blank" rel="noopener" class="btn btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            View GitHub ↗
          </a>
          <a href="https://linkedin.com/in/manikandanprabhu" target="_blank" rel="noopener" class="btn btn-outline">
            LinkedIn
          </a>
          <a href="mailto:manikandanprabhu.dev&#64;gmail.com" class="btn btn-outline">
            Email Me
          </a>
        </div>
      </section>

    </main>
  `,
  styles: [`
    .home-page { padding-top: 140px; }

    /* 01 HERO */
    .hero-section {
      margin-bottom: var(--space-12);
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: var(--space-8);
      align-items: center;

      @media (max-width: 968px) {
        grid-template-columns: 1fr;
      }
    }

    .hero-label-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-2);
      margin-bottom: var(--space-4);

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
      font-size: clamp(2.2rem, 4.5vw, 3.8rem);
      margin-bottom: var(--space-4);

      .text-gradient {
        background: linear-gradient(135deg, var(--text-primary), var(--accent-cyan));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .hero-description {
      font-size: 1.2rem;
      margin-bottom: var(--space-3);
    }

    .hero-subtext {
      font-size: 0.98rem;
      color: var(--text-tertiary);
      margin-bottom: var(--space-6);
    }

    .hero-cta-group {
      display: flex;
      gap: var(--space-3);
      flex-wrap: wrap;
    }

    /* 02 HERO VISUAL ANIMATED */
    .floating-app-window {
      padding: 0;
      overflow: hidden;
      border: 1px solid var(--border-medium);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
      animation: floatSubtle 6s ease-in-out infinite;

      .window-topbar {
        background: var(--bg-surface);
        padding: 10px var(--space-4);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-subtle);

        .dots-group {
          display: flex;
          gap: 6px;
          .dot { width: 10px; height: 10px; border-radius: 50%; }
          .dot-red { background: #ef4444; }
          .dot-amber { background: #f59e0b; }
          .dot-green { background: #10b981; }
        }

        .active-tab-bar {
          display: flex;
          gap: var(--space-2);
          .tab {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-tertiary);
            padding: 2px var(--space-2);
            border-radius: var(--radius-sm);
            &.active { background: var(--bg-secondary); color: var(--accent-cyan); }
          }
        }
      }

      .window-body {
        padding: var(--space-6);
        background: var(--bg-primary);

        .app-tech-header {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
          margin-bottom: var(--space-4);
        }

        .app-ui-preview {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: var(--space-4);

          .hero-row { height: 14px; width: 50%; background: var(--border-medium); border-radius: 4px; margin-bottom: var(--space-3); }
          .preview-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }
          .preview-card-item { height: 75px; background: var(--bg-secondary); border-radius: 4px; border: 1px solid var(--border-subtle); }
        }

        .floating-status-pill {
          margin-top: var(--space-4);
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--accent-emerald);
          background: rgba(16, 185, 129, 0.1);
          padding: 4px var(--space-3);
          border-radius: var(--radius-full);
          border: 1px solid rgba(16, 185, 129, 0.2);

          .pill-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-emerald); }
        }
      }
    }

    /* 03 SNAPSHOT */
    .recruiter-snapshot-card {
      padding: var(--space-6) var(--space-8);

      .snapshot-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-4);
        border-bottom: 1px solid var(--border-subtle);
        padding-bottom: var(--space-3);

        @media (max-width: 600px) { flex-direction: column; align-items: flex-start; gap: var(--space-2); }

        h3 { font-size: 1.3rem; margin-top: 4px; }
        .institution-tag { font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-tertiary); }
      }

      .snapshot-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: var(--space-4);

        @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 600px) { grid-template-columns: 1fr; }

        .spec-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;

          .label { font-size: 0.75rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; }
          .val { font-size: 0.92rem; color: var(--text-primary); font-weight: 500; &.highlight-emerald { color: var(--accent-emerald); } }
        }
      }
    }

    /* 04 STATS */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4);

      @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }

      .stat-card {
        padding: var(--space-5);
        display: flex;
        flex-direction: column;
        gap: 2px;
        text-align: center;

        .stat-number { font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; color: var(--accent-cyan); }
        .stat-label { font-size: 0.85rem; color: var(--text-tertiary); }
      }
    }

    /* 05 & 06 EDITORIAL PROJECTS */
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

          .project-number { font-family: var(--font-mono); color: var(--accent-cyan); font-size: 0.85rem; font-weight: 600; }
          .status-chip { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-tertiary); }
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

            &:hover { border-color: var(--accent-cyan); color: var(--accent-cyan); }
          }
        }

        .project-actions { display: flex; gap: var(--space-3); flex-wrap: wrap; }
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

          &:hover { transform: scale(1.02); }
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

    /* 07 BUILT TO LEARN */
    .matters-card {
      padding: var(--space-8);
      .matters-lead { font-size: 1.15rem; font-style: italic; color: var(--accent-cyan); margin: var(--space-3) 0 var(--space-6); }

      .matters-pillars-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-4);

        @media (max-width: 868px) { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 480px) { grid-template-columns: 1fr; }

        .matter-pillar {
          background: var(--bg-surface);
          padding: var(--space-4) var(--space-6);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);

          .pillar-icon { font-size: 1.4rem; }
          h4 { margin: var(--space-2) 0 var(--space-1); }
          p { font-size: 0.88rem; }
        }
      }
    }

    /* 08 TECHNICAL FOUNDATION */
    .foundation-groups-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-4);

      @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 600px) { grid-template-columns: 1fr; }

      .group-card {
        padding: var(--space-5);
        h4 { font-size: 1.05rem; margin-bottom: var(--space-3); color: var(--accent-cyan); }
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          span { font-size: 0.85rem; color: var(--text-secondary); background: var(--bg-surface); padding: 2px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); }
        }
      }
    }

    /* 09 CURRENTLY IMPROVING */
    .improving-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4);

      @media (max-width: 868px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 480px) { grid-template-columns: 1fr; }

      .improving-item {
        padding: var(--space-4);
        display: flex;
        flex-direction: column;
        gap: var(--space-2);

        .topic-name { font-size: 0.95rem; font-weight: 500; color: var(--text-primary); }
        .status-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          width: fit-content;

          &.tag-strengthening { background: rgba(0, 229, 255, 0.1); color: var(--accent-cyan); border: 1px solid rgba(0, 229, 255, 0.25); }
          &.tag-practicing { background: rgba(16, 185, 129, 0.1); color: var(--accent-emerald); border: 1px solid rgba(16, 185, 129, 0.25); }
          &.tag-learning { background: rgba(245, 158, 11, 0.1); color: var(--accent-amber); border: 1px solid rgba(245, 158, 11, 0.25); }
        }
      }
    }

    /* 10 PLACEMENT */
    .placement-card {
      padding: var(--space-8);
      .placement-lead { font-size: 1.15rem; color: var(--text-primary); margin: var(--space-3) 0 var(--space-4); max-width: 800px; }
      .prep-chips-row {
        display: flex;
        gap: var(--space-2);
        flex-wrap: wrap;
        margin-bottom: var(--space-4);
        span { font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-cyan); background: var(--bg-surface); padding: 4px var(--space-3); border-radius: var(--radius-full); border: 1px solid var(--border-subtle); }
      }
      .placement-actions { display: flex; gap: var(--space-3); flex-wrap: wrap; }
    }

    /* 11 WHAT I BRING */
    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4);

      @media (max-width: 868px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 480px) { grid-template-columns: 1fr; }

      .pillar-card {
        padding: var(--space-5);
        .pillar-num { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600; }
        h4 { font-size: 1.05rem; margin: var(--space-1) 0 var(--space-2); }
        p { font-size: 0.88rem; }
      }
    }

    /* 12 & 13 EDUCATION & CAREER */
    .edu-career-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-6);

      @media (max-width: 768px) { grid-template-columns: 1fr; }

      .edu-card, .career-card {
        padding: var(--space-6);
        h3 { font-size: 1.4rem; margin: var(--space-2) 0 var(--space-1); }
        .inst-name, .career-desc { font-size: 0.95rem; color: var(--text-secondary); }
        .edu-status-badge { font-size: 0.9rem; color: var(--accent-emerald); }
        .career-chips {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
          margin-top: var(--space-4);
          span { font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-cyan); background: var(--bg-surface); padding: 2px 8px; border-radius: var(--radius-sm); }
        }
      }
    }

    .cta-card {
      padding: var(--space-8);
      background: linear-gradient(135deg, rgba(0, 229, 255, 0.05), var(--bg-secondary));
      h2 { margin: var(--space-2) 0 var(--space-3); }
    }

    .social-links-row {
      display: flex;
      justify-content: center;
      gap: var(--space-4);
      flex-wrap: wrap;
    }

    .mt-8 { margin-top: var(--space-8); }
    .mt-12 { margin-top: var(--space-12); }
    .mt-16 { margin-top: var(--space-16); }
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

  ngOnInit() {
    this.seoService.setPageMeta(
      'Manikandan Prabhu | Full Stack Developer',
      'Manikandan Prabhu is a 3rd-year Information Technology student and Full Stack Developer focused on Java, Angular, Spring Boot, SQL, and practical web application development.'
    );

    this.apiService.getProjects().subscribe({
      next: (projects) => {
        this.featuredProjects.set(projects.slice(0, 3));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
