import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';
import { Article } from '../../core/models/article.model';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main *ngIf="article()" class="article-detail-page fade-in container-narrow">
      <div class="back-link">
        <a routerLink="/writing">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Writing
        </a>
      </div>

      <header class="article-header">
        <div class="article-meta">
          <span class="badge badge-cyan">{{ article()!.category }}</span>
          <span class="read-time">{{ article()!.readTime }}</span>
          <span class="pub-date">• Published {{ article()!.publishedAt }}</span>
        </div>

        <h1>{{ article()!.title }}</h1>
        <p class="summary-lead">{{ article()!.summary }}</p>
      </header>

      <article class="article-body glass-card">
        <div class="markdown-content" [innerHTML]="formattedContent()"></div>
      </article>

      <div class="article-author-box glass-card">
        <h4>About the Author</h4>
        <p><strong>Manikandan Prabhu</strong> is a Full Stack Developer specializing in Java, Spring Boot, Angular, and PostgreSQL enterprise applications.</p>
        <a routerLink="/contact" class="btn btn-outline btn-sm mt-3">Connect / Reach Out</a>
      </div>
    </main>
  `,
  styles: [`
    .article-detail-page {
      padding: 140px 0 var(--space-16);
    }

    .back-link {
      margin-bottom: var(--space-6);

      a {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
    }

    .article-header {
      margin-bottom: var(--space-8);

      .article-meta {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        margin-bottom: var(--space-4);
        font-size: 0.88rem;
        color: var(--text-tertiary);
      }

      h1 {
        font-size: clamp(2rem, 3.5vw, 3rem);
        margin-bottom: var(--space-4);
      }

      .summary-lead {
        font-size: 1.2rem;
        color: var(--text-secondary);
        line-height: 1.7;
      }
    }

    .article-body {
      padding: var(--space-8);
      margin-bottom: var(--space-8);

      .markdown-content {
        color: var(--text-secondary);
        font-size: 1.05rem;
        line-height: 1.8;

        h2, h3, h4 {
          color: var(--text-primary);
          margin: var(--space-6) 0 var(--space-3);
        }

        p {
          margin-bottom: var(--space-4);
        }

        ul, ol {
          padding-left: var(--space-6);
          margin-bottom: var(--space-4);
        }

        pre {
          background: var(--code-bg);
          border: 1px solid var(--code-border);
          border-radius: var(--radius-md);
          padding: var(--space-4);
          overflow-x: auto;
          font-family: var(--font-mono);
          font-size: 0.9rem;
          margin: var(--space-4) 0;
          color: var(--text-primary);
        }
      }
    }

    .article-author-box {
      padding: var(--space-6);
    }
    .mt-3 { margin-top: var(--space-3); }
  `]
})
export class ArticleDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);

  article = signal<Article | null>(null);
  formattedContent = signal<string>('');

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.apiService.getArticleBySlug(slug).subscribe(art => {
        this.article.set(art);
        this.formattedContent.set(this.parseSimpleMarkdown(art.content));
        this.seoService.setPageMeta(art.title, art.summary);
      });
    }
  }

  private parseSimpleMarkdown(content: string): string {
    return content
      .replace(/### (.*?)\n/g, '<h3>$1</h3>')
      .replace(/## (.*?)\n/g, '<h2>$1</h2>')
      .replace(/\`\`\`(java|typescript|sql)?\n([\s\S]*?)\`\`\`/g, '<pre><code>$2</code></pre>')
      .replace(/\`(.*?)\`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>');
  }
}
