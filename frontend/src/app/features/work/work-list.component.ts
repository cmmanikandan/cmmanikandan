import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-work-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="work-page">
      <div class="container">
        <!-- Page Header -->
        <header class="page-header">
          <span class="badge badge-cyan">Selected Work</span>
          <h1>Products, platforms &amp; engineering case studies</h1>
          <p>Real-world full-stack web applications, business platforms, microservices, and system architecture built around authentic user problems.</p>
        </header>

        <!-- Category Filters -->
        <div class="filter-bar">
          <button 
            *ngFor="let cat of categories" 
            class="filter-btn"
            [class.active]="selectedCategory() === cat"
            (click)="selectCategory(cat)">
            {{ cat }}
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          <article *ngFor="let project of filteredProjects()" class="project-card glass-card">
            <div class="card-header">
              <span class="project-num">{{ project.number }}</span>
              <span class="badge badge-cyan">{{ project.category }}</span>
            </div>

            <div class="card-body">
              <h3>{{ project.title }}</h3>
              <p class="oneliner">"{{ project.oneLiner }}"</p>
              <p class="summary">{{ project.summary }}</p>
            </div>

            <div class="card-footer">
              <div class="tech-pills">
                <span *ngFor="let tech of project.technologies.slice(0, 4)" class="tech-tag">{{ tech }}</span>
              </div>

              <div class="actions">
                <a [routerLink]="['/work', project.slug]" class="btn btn-primary btn-sm">
                  Explore Case Study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .work-page {
      padding: 140px 0 var(--space-16);
    }

    .page-header {
      margin-bottom: var(--space-8);
      max-width: 780px;

      h1 {
        margin: var(--space-3) 0 var(--space-4);
      }

      p {
        font-size: 1.15rem;
      }
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
        transition: all var(--transition-fast);

        &:hover, &.active {
          background: var(--bg-elevated);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }
      }
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-8);

      @media (max-width: 868px) {
        grid-template-columns: 1fr;
      }
    }

    .project-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: var(--space-4);
      padding: var(--space-8);

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .project-num {
          font-family: var(--font-mono);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent-cyan);
        }
      }

      .card-body {
        h3 {
          font-size: 1.6rem;
          margin-bottom: var(--space-2);
        }

        .oneliner {
          font-style: italic;
          color: var(--accent-teal);
          margin-bottom: var(--space-3);
          font-size: 0.95rem;
        }

        .summary {
          font-size: 0.95rem;
        }
      }

      .card-footer {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        padding-top: var(--space-4);
        border-top: 1px solid var(--border-subtle);

        .tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);

          .tech-tag {
            font-family: var(--font-mono);
            font-size: 0.78rem;
            color: var(--text-tertiary);
            background: var(--bg-surface);
            padding: 2px var(--space-2);
            border-radius: var(--radius-sm);
          }
        }
      }
    }
  `]
})
export class WorkListComponent implements OnInit {
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);

  categories = ['All', 'Full Stack', 'Enterprise Platform', 'Systems & APIs', 'Product Architecture'];
  selectedCategory = signal<string>('All');
  projects = signal<Project[]>([]);

  filteredProjects = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.projects();
    return this.projects().filter(p => p.category === cat);
  });

  ngOnInit() {
    this.seoService.setPageMeta(
      'Selected Work & Engineering Case Studies',
      'Detailed technical case studies showcasing full-stack enterprise web applications built with Java, Spring Boot, Angular, and PostgreSQL.'
    );

    this.apiService.getProjects().subscribe(list => {
      this.projects.set(list);
    });
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
