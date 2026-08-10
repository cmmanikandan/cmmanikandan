import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';
import { Project, CaseStudy } from '../../core/models/project.model';

@Component({
  selector: 'app-case-study',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main *ngIf="project()" class="case-study-page fade-in">
      <!-- HERO HEADER -->
      <header class="cs-hero">
        <div class="container">
          <div class="hero-back-link">
            <a routerLink="/work">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Selected Work
            </a>
          </div>

          <div class="hero-header-row">
            <span class="badge badge-cyan">{{ project()!.category }}</span>
            <span class="badge badge-emerald">{{ project()!.status }}</span>
          </div>

          <h1 class="cs-title">{{ project()!.title }}</h1>
          <p class="cs-oneliner">"{{ project()!.oneLiner }}"</p>

          <div class="cs-metadata-grid glass-card">
            <div class="meta-col">
              <span class="label">My Role</span>
              <span class="value">{{ project()!.role }}</span>
            </div>
            <div class="meta-col">
              <span class="label">Project Type</span>
              <span class="value">{{ project()!.timeline }}</span>
            </div>
            <div class="meta-col">
              <span class="label">Primary Stack</span>
              <span class="value">{{ project()!.technologies.slice(0, 5).join(', ') }}</span>
            </div>
            <div class="meta-col" *ngIf="project()!.githubUrl">
              <span class="label">Source Code</span>
              <a [href]="project()!.githubUrl" target="_blank" rel="noopener" class="value link">GitHub Repository</a>
            </div>
          </div>
        </div>
      </header>

      <!-- CASE STUDY CONTENT SECTIONS -->
      <section *ngIf="caseStudy()" class="cs-body container">
        
        <!-- 01 PROBLEM & CONTEXT -->
        <article class="cs-section glass-card">
          <div class="section-tag">01 / OVERVIEW &amp; PROBLEM</div>
          <h2>What Problem Was Solved?</h2>
          <p class="lead-text">{{ caseStudy()!.problem }}</p>
          
          <div class="context-box">
            <h4>System Context</h4>
            <p>{{ caseStudy()!.context }}</p>
          </div>

          <div class="goals-box">
            <h4>Project Goals</h4>
            <ul>
              <li *ngFor="let goal of caseStudy()!.goals">{{ goal }}</li>
            </ul>
          </div>
        </article>

        <!-- 02 HOW IT WORKS / USER FLOW -->
        <article class="cs-section glass-card" *ngIf="caseStudy()!.userFlows?.length">
          <div class="section-tag">02 / HOW IT WORKS</div>
          <h2>Step-by-Step User Flow</h2>
          
          <div class="flows-list">
            <div *ngFor="let flow of caseStudy()!.userFlows" class="flow-step">
              <div class="step-badge">Step {{ flow.stepNumber }}</div>
              <div class="step-content">
                <span class="actor-tag">{{ flow.actor }}</span>
                <h4>{{ flow.action }}</h4>
                <p>{{ flow.description }}</p>
              </div>
            </div>
          </div>
        </article>

        <!-- 03 SYSTEM ARCHITECTURE -->
        <article class="cs-section glass-card">
          <div class="section-tag">03 / APPLICATION STRUCTURE</div>
          <h2>How the System Works</h2>
          <p>{{ caseStudy()!.architectureOverview }}</p>

          <div class="architecture-grid">
            <div *ngFor="let node of caseStudy()!.architectureNodes" class="arch-node">
              <div class="arch-type">{{ node.type }}</div>
              <h4>{{ node.name }}</h4>
              <span class="arch-tech">{{ node.tech }}</span>
              <p>{{ node.description }}</p>
            </div>
          </div>
        </article>

        <!-- 04 TECHNICAL DECISIONS -->
        <article class="cs-section glass-card" *ngIf="caseStudy()!.keyTechnicalDecisions?.length">
          <div class="section-tag">04 / TECHNICAL DECISIONS</div>
          <h2>Key Implementation Choices &amp; Rationale</h2>

          <div class="decisions-list">
            <div *ngFor="let item of caseStudy()!.keyTechnicalDecisions" class="decision-card">
              <h3>{{ item.title }}</h3>
              <div class="decision-block">
                <strong>Decision:</strong> {{ item.decision }}
              </div>
              <div class="decision-block">
                <strong>Rationale:</strong> {{ item.rationale }}
              </div>
              <div class="tradeoff-block">
                <strong>Trade-off / Consideration:</strong> {{ item.tradeoff }}
              </div>
            </div>
          </div>
        </article>

        <!-- 05 CHALLENGES & SOLUTIONS -->
        <article class="cs-section glass-card" *ngIf="caseStudy()!.challenges?.length">
          <div class="section-tag">05 / CHALLENGES ENCOUNTERED</div>
          <h2>Problems Solved During Development</h2>

          <div class="challenges-grid">
            <div *ngFor="let c of caseStudy()!.challenges" class="challenge-card">
              <div class="ch-problem">
                <h4>Challenge</h4>
                <p>{{ c.challenge }}</p>
              </div>
              <div class="ch-solution">
                <h4>Solution</h4>
                <p>{{ c.solution }}</p>
              </div>
            </div>
          </div>
        </article>

        <!-- 06 INTERVIEW HIGHLIGHTS (PLACEMENT PREPARATION) -->
        <article class="cs-section glass-card highlight-section" *ngIf="caseStudy()!.interviewHighlights?.length">
          <div class="section-tag">06 / INTERVIEW HIGHLIGHTS</div>
          <h2>Placement Interview Talking Points</h2>
          <p class="highlight-intro">Key concepts and technical discussions related to this project during candidate screening:</p>

          <div class="interview-grid">
            <div *ngFor="let item of caseStudy()!.interviewHighlights" class="interview-card">
              <span class="interview-icon">💡</span>
              <p>{{ item }}</p>
            </div>
          </div>
        </article>

        <!-- 07 LEARNINGS & FUTURE IMPROVEMENTS -->
        <article class="cs-section glass-card">
          <div class="section-tag">07 / LEARNINGS &amp; FUTURE IMPROVEMENTS</div>
          <h2>Retrospective &amp; Planned Features</h2>

          <div class="retro-grid">
            <div class="learnings-box">
              <h4>What I Learned</h4>
              <ul>
                <li *ngFor="let l of caseStudy()!.learnings">{{ l }}</li>
              </ul>
            </div>
            <div class="next-box" *ngIf="caseStudy()!.futureImprovements?.length">
              <h4>Future Improvements (Planned)</h4>
              <ul>
                <li *ngFor="let f of caseStudy()!.futureImprovements">{{ f }}</li>
              </ul>
            </div>
          </div>
        </article>

        <!-- FOOTER NAV -->
        <div class="cs-footer-nav">
          <a routerLink="/work" class="btn btn-secondary">Explore Other Projects</a>
          <a routerLink="/contact" class="btn btn-primary">Let's Talk About This Project</a>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .case-study-page { padding: 130px 0 var(--space-16); }

    .cs-hero {
      margin-bottom: var(--space-12);

      .hero-back-link {
        margin-bottom: var(--space-4);
        a {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
      }

      .hero-header-row {
        display: flex;
        gap: var(--space-3);
        margin-bottom: var(--space-3);
      }

      .cs-title {
        font-size: clamp(2.2rem, 4vw, 3.5rem);
        margin-bottom: var(--space-2);
      }

      .cs-oneliner {
        font-size: 1.2rem;
        font-style: italic;
        color: var(--accent-teal);
        margin-bottom: var(--space-6);
      }

      .cs-metadata-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-6);
        padding: var(--space-6);

        @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }

        .meta-col {
          display: flex;
          flex-direction: column;
          gap: 4px;

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

            &.link { color: var(--accent-cyan); }
          }
        }
      }
    }

    .cs-body {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
    }

    .cs-section {
      padding: var(--space-8);

      .section-tag {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--accent-cyan);
        margin-bottom: var(--space-2);
      }

      h2 { margin-bottom: var(--space-4); }

      .lead-text {
        font-size: 1.15rem;
        color: var(--text-primary);
        line-height: 1.7;
        margin-bottom: var(--space-6);
      }

      .context-box, .goals-box {
        background: var(--bg-surface);
        padding: var(--space-6);
        border-radius: var(--radius-md);
        border: 1px solid var(--border-subtle);
        margin-top: var(--space-4);

        h4 { margin-bottom: var(--space-3); color: var(--accent-cyan); }
        ul {
          padding-left: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          li { color: var(--text-secondary); }
        }
      }
    }

    .flows-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);

      .flow-step {
        display: flex;
        gap: var(--space-4);
        background: var(--bg-surface);
        padding: var(--space-4) var(--space-6);
        border-radius: var(--radius-md);
        border: 1px solid var(--border-subtle);

        .step-badge {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--accent-cyan);
          background: rgba(0, 229, 255, 0.1);
          padding: 4px var(--space-3);
          border-radius: var(--radius-sm);
          height: fit-content;
        }

        .step-content {
          .actor-tag {
            font-size: 0.75rem;
            color: var(--accent-teal);
            text-transform: uppercase;
            font-weight: 600;
          }
          h4 { margin: 2px 0 var(--space-1); }
        }
      }
    }

    .architecture-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-4);
      margin-top: var(--space-6);

      @media (max-width: 868px) { grid-template-columns: 1fr; }

      .arch-node {
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        padding: var(--space-5);
        border-radius: var(--radius-md);

        .arch-type {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-cyan);
          text-transform: uppercase;
        }
        h4 { margin: var(--space-1) 0; }
        .arch-tech {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-tertiary);
          display: block;
          margin-bottom: var(--space-2);
        }
        p { font-size: 0.88rem; }
      }
    }

    .decisions-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);

      .decision-card {
        background: var(--bg-surface);
        padding: var(--space-6);
        border-radius: var(--radius-md);
        border-left: 3px solid var(--accent-cyan);

        h3 { margin-bottom: var(--space-3); }
        .decision-block, .tradeoff-block {
          font-size: 0.95rem;
          margin-bottom: var(--space-2);
          color: var(--text-secondary);
        }
        .tradeoff-block { color: var(--accent-amber); }
      }
    }

    .challenges-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-6);

      @media (max-width: 768px) { grid-template-columns: 1fr; }

      .challenge-card {
        background: var(--bg-surface);
        padding: var(--space-6);
        border-radius: var(--radius-md);
        border: 1px solid var(--border-subtle);
        display: flex;
        flex-direction: column;
        gap: var(--space-4);

        h4 { color: var(--accent-cyan); margin-bottom: var(--space-1); }
      }
    }

    /* INTERVIEW HIGHLIGHTS */
    .highlight-section {
      background: linear-gradient(135deg, rgba(0, 229, 255, 0.05), var(--bg-secondary));

      .highlight-intro {
        font-size: 1rem;
        color: var(--text-secondary);
        margin-bottom: var(--space-6);
      }

      .interview-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-4);

        @media (max-width: 768px) { grid-template-columns: 1fr; }

        .interview-card {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          background: var(--bg-surface);
          padding: var(--space-4) var(--space-6);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);

          .interview-icon { font-size: 1.2rem; }
          p { font-size: 0.95rem; color: var(--text-primary); margin: 0; }
        }
      }
    }

    .retro-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-6);

      @media (max-width: 768px) { grid-template-columns: 1fr; }

      .learnings-box, .next-box {
        background: var(--bg-surface);
        padding: var(--space-6);
        border-radius: var(--radius-md);
        border: 1px solid var(--border-subtle);

        h4 { margin-bottom: var(--space-3); color: var(--accent-cyan); }
        ul {
          padding-left: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
      }
    }

    .cs-footer-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--space-8);

      @media (max-width: 480px) {
        flex-direction: column;
        gap: var(--space-3);
      }
    }
  `]
})
export class CaseStudyComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);

  project = signal<Project | null>(null);
  caseStudy = signal<CaseStudy | null>(null);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.apiService.getProjectBySlug(slug).subscribe({
        next: (p) => {
          this.project.set(p);
          if (p.caseStudy) {
            this.caseStudy.set(p.caseStudy);
          }
          this.seoService.setPageMeta(
            `${p.title} — Project Case Study`,
            p.summary
          );
        },
        error: () => {
          // 404 handler
        }
      });
    }
  }
}
