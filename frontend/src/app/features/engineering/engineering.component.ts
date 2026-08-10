import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-engineering',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="engineering-page">
      <div class="container">
        <!-- Page Header -->
        <header class="page-header">
          <span class="badge badge-cyan">Development Process</span>
          <h1>How I Build Software</h1>
          <p>I focus on understanding the problem, designing a clear user experience, building reliable applications, and continuously improving my technical skills.</p>
        </header>

        <!-- 6 Practical Developer Pillars -->
        <div class="pillars-container">
          
          <article class="pillar-section glass-card reveal-on-scroll">
            <div class="pillar-num">01</div>
            <div class="pillar-content">
              <h3>Understanding the Problem</h3>
              <p>Great web development starts with understanding the user's needs and project goals before jumping into code.</p>
              <ul class="bullet-list">
                <li>Identify key user flows and core application requirements.</li>
                <li>Define realistic project goals and feature priorities.</li>
                <li>Keep application structure clear, modular, and easy to maintain.</li>
              </ul>
            </div>
          </article>

          <article class="pillar-section glass-card reveal-on-scroll">
            <div class="pillar-num">02</div>
            <div class="pillar-content">
              <h3>UI / UX Design</h3>
              <p>Interfaces should be functional, readable, responsive, and clear across devices.</p>
              <ul class="bullet-list">
                <li>Plan user journeys and responsive layout structures in Figma.</li>
                <li>Emphasize typography contrast, intuitive navigation, and clean visual hierarchy.</li>
                <li>Design mobile-first responsive components that adjust smoothly to all screen sizes.</li>
              </ul>
            </div>
          </article>

          <article class="pillar-section glass-card reveal-on-scroll">
            <div class="pillar-num">03</div>
            <div class="pillar-content">
              <h3>Frontend Development</h3>
              <p>Building clean single-page web applications using modern web standards and Angular.</p>
              <ul class="bullet-list">
                <li>Structured web pages using semantic HTML5 and clean SCSS styling.</li>
                <li>Type-safe component logic with TypeScript and modern Angular primitives.</li>
                <li>Form input validation, error messaging, and reactive UI state handling.</li>
              </ul>
            </div>
          </article>

          <article class="pillar-section glass-card reveal-on-scroll">
            <div class="pillar-num">04</div>
            <div class="pillar-content">
              <h3>Backend Development</h3>
              <p>Developing backend Web APIs in Java Spring Boot for data processing and RESTful routing.</p>
              <ul class="bullet-list">
                <li>Structuring controllers, service classes, and data models cleanly.</li>
                <li>Designing RESTful JSON endpoints for client-server communication.</li>
                <li>Validating request inputs and handling unexpected errors gracefully.</li>
              </ul>
            </div>
          </article>

          <article class="pillar-section glass-card reveal-on-scroll">
            <div class="pillar-num">05</div>
            <div class="pillar-content">
              <h3>Database Engineering</h3>
              <p>Organizing application data using relational database schemas and SQL.</p>
              <ul class="bullet-list">
                <li>Designing normalized relational table schemas in MySQL, PostgreSQL, and Supabase.</li>
                <li>Establishing clear foreign key relationships and primary keys.</li>
                <li>Writing clean SQL queries to read, insert, update, and manage records.</li>
              </ul>
            </div>
          </article>

          <article class="pillar-section glass-card reveal-on-scroll">
            <div class="pillar-num">06</div>
            <div class="pillar-content">
              <h3>Testing &amp; Deployment</h3>
              <p>Verifying API endpoints, maintaining clean version history, and deploying web applications.</p>
              <ul class="bullet-list">
                <li>Testing REST API endpoints and response codes using Postman.</li>
                <li>Managing source code versions and feature commits with Git and GitHub.</li>
                <li>Deploying web applications smoothly to platforms like Vercel.</li>
              </ul>
            </div>
          </article>

        </div>

        <!-- BOTTOM CTA -->
        <div class="eng-cta glass-card reveal-on-scroll">
          <h3>Interested in discussing a project or full-stack role?</h3>
          <a routerLink="/contact" class="btn btn-primary">Get In Touch</a>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .engineering-page {
      padding: 140px 0 var(--space-16);
    }

    .page-header {
      margin-bottom: var(--space-12);
      max-width: 820px;

      h1 {
        margin: var(--space-3) 0 var(--space-4);
      }

      p {
        font-size: 1.15rem;
      }
    }

    .pillars-container {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
      margin-bottom: var(--space-12);
    }

    .pillar-section {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: var(--space-6);
      padding: var(--space-8);

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
        padding: var(--space-6);
      }

      .pillar-num {
        font-family: var(--font-mono);
        font-size: 2rem;
        font-weight: 700;
        color: var(--accent-cyan);
      }

      .pillar-content {
        h3 {
          font-size: 1.5rem;
          margin-bottom: var(--space-3);
        }

        p {
          margin-bottom: var(--space-4);
          font-size: 1.05rem;
        }

        .bullet-list {
          padding-left: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);

          li {
            color: var(--text-secondary);
            font-size: 0.95rem;
          }
        }
      }
    }

    .eng-cta {
      padding: var(--space-8);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
    }
  `]
})
export class EngineeringComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setPageMeta(
      'How I Build Software — Development Process',
      'The 6 practical web development pillars of Manikandan Prabhu: Problem Understanding, UI/UX Design, Frontend Development, Backend Development, Database Engineering, and Testing & Deployment.'
    );
  }
}
