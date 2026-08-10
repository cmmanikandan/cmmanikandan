import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="resume-page">
      <div class="container container-narrow">
        <!-- Top Toolbar -->
        <div class="resume-toolbar no-print">
          <span class="badge badge-cyan">Recruiter Resume</span>
          <button class="btn btn-primary btn-sm" (click)="downloadOrPrintResume()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Print / Save PDF
          </button>
        </div>

        <!-- RESUME DOCUMENT SHEET -->
        <article class="resume-document glass-card">
          <!-- HEADER -->
          <header class="resume-header">
            <div>
              <h1>Manikandan Prabhu</h1>
              <p class="role-title">Full Stack Developer • 3rd-Year B.Tech IT Student</p>
            </div>
            <div class="contact-info">
              <span>M. Kumarasamy College of Engineering (MKCE), Karur</span>
              <span>manikandanprabhu.dev&#64;gmail.com</span>
              <a href="https://github.com/Manikandan-Prabhu" target="_blank">github.com/Manikandan-Prabhu</a>
              <a href="https://linkedin.com/in/manikandanprabhu" target="_blank">linkedin.com/in/manikandanprabhu</a>
            </div>
          </header>

          <hr class="divider">

          <!-- EXECUTIVE SUMMARY -->
          <section class="resume-sec">
            <h3>Summary</h3>
            <p>
              3rd-year Information Technology student at M. Kumarasamy College of Engineering (MKCE), Karur, focused on Java, Angular, Spring Boot, SQL, and practical web application development. Experienced in building academic and personal software projects across frontend UI design, RESTful backend endpoints, relational database schemas, and deployment workflows.
            </p>
          </section>

          <!-- CAREER OBJECTIVE -->
          <section class="resume-sec">
            <h3>Career Objective</h3>
            <p>
              Seeking opportunities to begin my software development career in a growth-oriented technology team where I can apply my Java, web development, database, and problem-solving skills while learning from experienced engineers and contributing to real-world software products.
            </p>
          </section>

          <!-- TECHNICAL SKILLS -->
          <section class="resume-sec">
            <h3>Technical Skills</h3>
            <div class="skills-grid">
              <div><strong>Programming Languages:</strong> Java, Python, C, JavaScript, TypeScript, SQL</div>
              <div><strong>Frontend:</strong> HTML, CSS, SCSS, JavaScript, TypeScript, Angular</div>
              <div><strong>Backend:</strong> Java Core, Spring Boot, REST APIs</div>
              <div><strong>Databases:</strong> MySQL, PostgreSQL, Supabase</div>
              <div><strong>Tools &amp; Design:</strong> Git, GitHub, VS Code, Postman, Figma</div>
            </div>
          </section>

          <!-- MAJOR PROJECTS -->
          <section class="resume-sec">
            <h3>Projects</h3>
            
            <div class="item-block">
              <div class="item-header">
                <strong>Qubink — Smart Campus Printing Platform</strong>
                <span>Full Stack Developer</span>
              </div>
              <p class="item-sub">Angular, TypeScript, Java, Spring Boot, PostgreSQL</p>
              <ul>
                <li>Developed document upload portal and parameter selection UI using Angular Reactive Forms.</li>
                <li>Created Java Spring Boot REST API endpoints for document processing and order calculations.</li>
                <li>Organized PostgreSQL database tables for print order history and status ledgers.</li>
              </ul>
            </div>

            <div class="item-block">
              <div class="item-header">
                <strong>FINOVA — Personal Finance Platform</strong>
                <span>Full Stack Developer</span>
              </div>
              <p class="item-sub">Angular, Java, Spring Boot, MySQL</p>
              <ul>
                <li>Built expense tracking dashboard and monthly spending breakdown components in Angular.</li>
                <li>Created RESTful endpoints in Spring Boot to store financial records and calculate summary totals.</li>
              </ul>
            </div>

            <div class="item-block">
              <div class="item-header">
                <strong>ServiceHub — Local Services Marketplace</strong>
                <span>Full Stack Developer</span>
              </div>
              <p class="item-sub">Angular, Spring Boot, PostgreSQL</p>
              <ul>
                <li>Structured web service booking workflows between customers and local service providers.</li>
                <li>Designed relational database schemas for service listings and request queue management.</li>
              </ul>
            </div>
          </section>

          <!-- EDUCATION -->
          <section class="resume-sec">
            <h3>Education</h3>
            <div class="item-block">
              <div class="item-header">
                <strong>B.Tech Information Technology</strong>
                <span>Present (3rd Year)</span>
              </div>
              <p class="item-inst">M. Kumarasamy College of Engineering (MKCE), Karur</p>
              <p class="item-sub">Core Focus: Data Structures &amp; Algorithms, Object-Oriented Java, Database Management Systems (DBMS), Web Development</p>
            </div>
          </section>
        </article>
      </div>
    </main>
  `,
  styles: [`
    .resume-page {
      padding: 140px 0 var(--space-16);
    }

    .resume-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-6);
    }

    .resume-document {
      padding: var(--space-12);
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      color: var(--text-primary);

      @media (max-width: 600px) {
        padding: var(--space-6);
      }
    }

    .resume-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-4);

      @media (max-width: 640px) {
        flex-direction: column;
        gap: var(--space-3);
      }

      h1 {
        font-size: 2.2rem;
      }

      .role-title {
        font-size: 1.05rem;
        color: var(--accent-cyan);
        font-weight: 500;
      }

      .contact-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size: 0.85rem;
        color: var(--text-secondary);

        @media (max-width: 640px) {
          align-items: flex-start;
        }

        a {
          color: var(--text-secondary);
          &:hover { color: var(--accent-cyan); }
        }
      }
    }

    .divider {
      border: none;
      border-top: 1px solid var(--border-subtle);
      margin: var(--space-6) 0;
    }

    .resume-sec {
      margin-bottom: var(--space-6);

      h3 {
        font-size: 1.15rem;
        color: var(--accent-cyan);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: var(--space-3);
        border-bottom: 1px solid var(--border-subtle);
        padding-bottom: var(--space-1);
      }

      p {
        font-size: 0.95rem;
      }
    }

    .skills-grid {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      font-size: 0.92rem;
      color: var(--text-secondary);
    }

    .item-block {
      margin-bottom: var(--space-4);

      .item-header {
        display: flex;
        justify-content: space-between;
        font-size: 1rem;

        @media (max-width: 480px) {
          flex-direction: column;
        }
      }

      .item-inst {
        font-weight: 500;
        color: var(--text-primary);
        font-size: 0.95rem;
      }

      .item-sub {
        font-family: var(--font-mono);
        font-size: 0.82rem;
        color: var(--accent-teal);
        margin-bottom: var(--space-2);
      }

      ul {
        padding-left: var(--space-4);
        display: flex;
        flex-direction: column;
        gap: 4px;

        li {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
      }
    }

    @media print {
      .no-print { display: none !important; }
      body { background: white !important; color: black !important; }
      .resume-document { border: none !important; background: white !important; color: black !important; }
    }
  `]
})
export class ResumeComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setPageMeta(
      'Manikandan Prabhu — Recruiter Resume',
      'Resume of Manikandan Prabhu, 3rd-year B.Tech Information Technology student at M. Kumarasamy College of Engineering (MKCE), Karur, focused on Java, Spring Boot, Angular, and PostgreSQL.'
    );
  }

  downloadOrPrintResume() {
    window.print();
  }
}
