import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';
import { Project } from '../../core/models/project.model';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-work-list',
  standalone: true,
  imports: [CommonModule, RouterLink, SkeletonLoaderComponent],
  template: `
    <main class="work-page">
      <div class="container">
        <!-- Page Header -->
        <header class="page-header">
          <span class="badge badge-cyan">Selected Work</span>
          <h1>Projects &amp; Practical Applications</h1>
          <p>A selection of full-stack web applications and digital products built to solve real campus and user problems.</p>
        </header>

        <!-- Category Filter Pills -->
        <div class="filter-bar">
          <button 
            *ngFor="let cat of categories" 
            class="filter-btn"
            [class.active]="selectedCategory() === cat"
            (click)="selectCategory(cat)">
            {{ cat }}
          </button>
        </div>

        <!-- SKELETON LOADING STATE -->
        <div *ngIf="loading()" class="skeletons-list">
          <app-skeleton-loader></app-skeleton-loader>
          <app-skeleton-loader></app-skeleton-loader>
        </div>

        <!-- ERROR / EMPTY STATE -->
        <div *ngIf="!loading() && filteredProjects().length === 0" class="empty-state-card glass-card">
          <h3>No projects found</h3>
          <p>No projects match the selected category filter.</p>
          <button class="btn btn-primary btn-sm mt-4" (click)="selectCategory('All')">Show All Projects</button>
        </div>

        <!-- PROJECTS SHOWCASE LIST -->
        <div *ngIf="!loading() && filteredProjects().length > 0" class="projects-showcase-list">
          <article 
            *ngFor="let project of filteredProjects(); let i = index" 
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
    </main>
  `,
  styles: [`
    .work-page { padding: 140px 0 var(--space-16); }

    .page-header {
      margin-bottom: var(--space-8);
      max-width: 780px;

      h1 { margin: var(--space-3) 0 var(--space-4); }
      p { font-size: 1.15rem; color: var(--text-secondary); }
    }

    .filter-bar {
      display: flex;
      gap: var(--space-3);
      flex-wrap: wrap;
      margin-bottom: var(--space-8);
      padding-bottom: var(--space-4);
      border-bottom: 1px solid var(--border-subtle);

      .filter-btn {
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        color: var(--text-secondary);
        padding: var(--space-2) var(--space-4);
        border-radius: var(--radius-full);
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 200ms ease;

        &:hover, &.active {
          background: var(--bg-elevated);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }
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

    .empty-state-card {
      text-align: center;
      padding: var(--space-8);
      h3 { color: var(--accent-cyan); margin-bottom: var(--space-2); }
    }
  `]
})
export class WorkListComponent implements OnInit {
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);

  categories = ['All', 'Full Stack', 'Enterprise Platform', 'Systems & APIs'];
  selectedCategory = signal<string>('All');
  projects = signal<Project[]>([]);
  loading = signal<boolean>(true);

  filteredProjects = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.projects();
    return this.projects().filter(p => p.category === cat);
  });

  ngOnInit() {
    this.seoService.setPageMeta(
      'Selected Work & Projects — Manikandan Prabhu',
      'Explore projects built by Manikandan Prabhu, 3rd-year B.Tech IT student at MKCE Karur, featuring Java, Spring Boot, Angular, and PostgreSQL.'
    );

    this.apiService.getProjects().subscribe({
      next: (list) => {
        this.projects.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
