import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="about-page">
      <div class="container">
        <!-- Header -->
        <header class="page-header">
          <span class="badge badge-cyan">About Me</span>
          <h1>Full Stack Developer focused on building practical web applications.</h1>
          <p class="lead-bio">
            I am Manikandan Prabhu, a 3rd-year Information Technology student at M. Kumarasamy College of Engineering (MKCE), Karur, focused on building practical web applications using Java, Spring Boot, Angular, databases, and modern web technologies.
          </p>
        </header>

        <!-- NARRATIVE SECTION -->
        <section class="narrative-grid">
          <div class="narrative-content glass-card">
            <h3>Who I Am &amp; What I Build</h3>
            <p>
              I am currently in my 3rd year pursuing <strong>B.Tech Information Technology</strong> at <strong>M. Kumarasamy College of Engineering (MKCE), Karur</strong>. I enjoy taking software concepts from idea to functional implementation, connecting frontend user interfaces with structured backend APIs and database storage.
            </p>
            <p>
              My full-stack project portfolio includes campus printing workflow tools (<strong>Qubink</strong>), personal finance and budgeting platforms (<strong>FINOVA</strong>), local service marketplaces (<strong>ServiceHub</strong>), and placement preparation trackers (<strong>PlacementOS</strong>).
            </p>

            <h3 class="mt-6">Career Objective</h3>
            <p>
              "I am seeking opportunities to begin my software development career in a growth-oriented technology team where I can apply my Java, web development, database, and problem-solving skills while learning from experienced engineers and contributing to real-world software products."
            </p>

            <h3 class="mt-6">What I'm Looking For</h3>
            <ul class="looking-list">
              <li>🎓 <strong>Campus Placements &amp; Graduate Roles:</strong> Entry-Level Software Engineer, Java Developer, Full Stack Developer.</li>
              <li>⚡ <strong>Internships:</strong> Full Stack / Java / Software Development Internships.</li>
              <li>💻 <strong>Technical Focus:</strong> Java, Spring Boot, Angular, SQL, PostgreSQL, MySQL, Supabase.</li>
            </ul>
          </div>

          <!-- SIDEBAR SPECS -->
          <div class="narrative-sidebar">
            <div class="sidebar-card glass-card">
              <h4>Recruiter Quick Specs</h4>
              <div class="spec-item">
                <span class="label">Name</span>
                <span class="value">Manikandan Prabhu</span>
              </div>
              <div class="spec-item">
                <span class="label">Degree</span>
                <span class="value">B.Tech Information Technology</span>
              </div>
              <div class="spec-item">
                <span class="label">Institution</span>
                <span class="value">M. Kumarasamy College of Engineering (MKCE), Karur</span>
              </div>
              <div class="spec-item">
                <span class="label">Academic Status</span>
                <span class="value">3rd-Year Student (Present)</span>
              </div>
              <div class="spec-item">
                <span class="label">Primary Focus</span>
                <span class="value">Java Full Stack Development</span>
              </div>
              <div class="spec-item">
                <span class="label">Availability</span>
                <span class="value color-emerald">Open to Internships &amp; Placements</span>
              </div>

              <div class="sidebar-actions mt-6">
                <a routerLink="/resume" class="btn btn-primary w-full">View Resume</a>
                <a routerLink="/contact" class="btn btn-outline w-full mt-2">Contact Me</a>
              </div>
            </div>
          </div>
        </section>

        <!-- TECHNICAL SKILLS MATRIX -->
        <section class="tech-section mt-12">
          <h2>Technical Skills</h2>
          <p class="section-sub">Primary programming languages, frameworks, databases, and development tools.</p>

          <div class="tech-grid">
            <div class="tech-card glass-card">
              <div class="tech-icon-header">
                <span class="badge badge-cyan">PROGRAMMING</span>
              </div>
              <h4>Languages</h4>
              <ul class="tech-list">
                <li>Java</li>
                <li>Python</li>
                <li>C</li>
                <li>TypeScript</li>
                <li>JavaScript</li>
                <li>SQL</li>
              </ul>
            </div>

            <div class="tech-card glass-card">
              <div class="tech-icon-header">
                <span class="badge badge-cyan">FRONTEND</span>
              </div>
              <h4>Frontend</h4>
              <ul class="tech-list">
                <li>HTML</li>
                <li>CSS / SCSS</li>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>Angular</li>
                <li>Responsive UI Design</li>
              </ul>
            </div>

            <div class="tech-card glass-card">
              <div class="tech-icon-header">
                <span class="badge badge-cyan">BACKEND</span>
              </div>
              <h4>Backend &amp; API</h4>
              <ul class="tech-list">
                <li>Java Core</li>
                <li>Spring Boot</li>
                <li>REST APIs</li>
                <li>Request Validation</li>
                <li>Business Logic</li>
              </ul>
            </div>

            <div class="tech-card glass-card">
              <div class="tech-icon-header">
                <span class="badge badge-cyan">DATABASE &amp; TOOLS</span>
              </div>
              <h4>Databases &amp; Tools</h4>
              <ul class="tech-list">
                <li>MySQL</li>
                <li>PostgreSQL</li>
                <li>Supabase</li>
                <li>Git &amp; GitHub</li>
                <li>VS Code &amp; Postman</li>
                <li>Figma</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </main>
  `,
  styles: [`
    .about-page {
      padding: 140px 0 var(--space-16);
    }

    .page-header {
      margin-bottom: var(--space-12);
      max-width: 820px;

      h1 {
        margin: var(--space-3) 0 var(--space-4);
      }

      .lead-bio {
        font-size: 1.2rem;
        color: var(--text-primary);
        line-height: 1.7;
      }
    }

    .narrative-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--space-8);

      @media (max-width: 868px) {
        grid-template-columns: 1fr;
      }

      .narrative-content {
        padding: var(--space-8);
        display: flex;
        flex-direction: column;
        gap: var(--space-4);

        h3 {
          color: var(--text-primary);
          &.mt-6 { margin-top: var(--space-6); }
        }

        p {
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .looking-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);

          li {
            font-size: 0.98rem;
            color: var(--text-secondary);
            background: var(--bg-surface);
            padding: var(--space-3);
            border-radius: var(--radius-md);
            border: 1px solid var(--border-subtle);
          }
        }
      }

      .sidebar-card {
        padding: var(--space-6);
        display: flex;
        flex-direction: column;
        gap: var(--space-3);

        h4 {
          margin-bottom: var(--space-2);
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: var(--space-2);
        }

        .spec-item {
          display: flex;
          flex-direction: column;
          gap: 2px;

          .label {
            font-size: 0.75rem;
            color: var(--text-tertiary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .value {
            font-size: 0.95rem;
            font-weight: 500;
            color: var(--text-primary);

            &.color-emerald {
              color: var(--accent-emerald);
            }
          }
        }
      }
    }

    .tech-section {
      h2 { margin-bottom: var(--space-2); }
      .section-sub { margin-bottom: var(--space-8); }
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-6);

      @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 600px) { grid-template-columns: 1fr; }

      .tech-card {
        padding: var(--space-6);
        display: flex;
        flex-direction: column;
        gap: var(--space-3);

        h4 { font-size: 1.1rem; margin-bottom: var(--space-2); }

        .tech-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);

          li {
            font-size: 0.9rem;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: var(--space-2);

            &::before { content: '•'; color: var(--accent-cyan); }
          }
        }
      }
    }

    .mt-12 { margin-top: var(--space-12); }
    .w-full { width: 100%; }
    .mt-2 { margin-top: var(--space-2); }
    .mt-6 { margin-top: var(--space-6); }
  `]
})
export class AboutComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setPageMeta(
      'About Manikandan Prabhu — MKCE Karur Student & Full Stack Developer',
      'Learn about Manikandan Prabhu, a 3rd-year B.Tech Information Technology student at M. Kumarasamy College of Engineering (MKCE), Karur, focused on Java, Spring Boot, Angular, and PostgreSQL.'
    );
  }
}
