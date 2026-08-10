import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';
import { Article } from '../../core/models/article.model';

@Component({
  selector: 'app-writing-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="writing-page">
      <div class="container">
        <!-- Header -->
        <header class="page-header">
          <span class="badge badge-cyan">Technical Writing</span>
          <h1>Engineering Insights &amp; Articles</h1>
          <p>Technical articles, architectural breakdowns, and engineering lessons on Java, Spring Boot, Angular Signals, and Database Systems.</p>
        </header>

        <!-- Articles Grid -->
        <div class="articles-list">
          <article *ngFor="let article of articles()" class="article-item glass-card">
            <div class="article-header">
              <span class="badge badge-cyan">{{ article.category }}</span>
              <span class="read-time">{{ article.readTime }}</span>
            </div>

            <h2><a [routerLink]="['/writing', article.slug]">{{ article.title }}</a></h2>
            <p class="summary">{{ article.summary }}</p>

            <div class="article-footer">
              <div class="tags-row">
                <span *ngFor="let tag of article.tags" class="tag-pill">#{{ tag }}</span>
              </div>
              <div class="date-row">Published on {{ article.publishedAt }}</div>
            </div>
          </article>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .writing-page {
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

    .articles-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
      max-width: 900px;
    }

    .article-item {
      padding: var(--space-8);
      display: flex;
      flex-direction: column;
      gap: var(--space-4);

      .article-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .read-time {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
      }

      h2 a {
        color: var(--text-primary);
        font-size: 1.75rem;

        &:hover {
          color: var(--accent-cyan);
        }
      }

      .summary {
        font-size: 1.05rem;
        color: var(--text-secondary);
      }

      .article-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: var(--space-4);
        border-top: 1px solid var(--border-subtle);

        @media (max-width: 600px) {
          flex-direction: column;
          align-items: flex-start;
          gap: var(--space-2);
        }

        .tags-row {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;

          .tag-pill {
            font-family: var(--font-mono);
            font-size: 0.78rem;
            color: var(--text-tertiary);
          }
        }

        .date-row {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
      }
    }
  `]
})
export class WritingListComponent implements OnInit {
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);

  articles = signal<Article[]>([]);

  ngOnInit() {
    this.seoService.setPageMeta(
      'Technical Writing & Articles',
      'Engineering articles by Manikandan Prabhu covering Java Spring Boot, Angular Signals, Database locking, and Web Architecture.'
    );

    this.apiService.getArticles().subscribe(list => {
      this.articles.set(list);
    });
  }
}
