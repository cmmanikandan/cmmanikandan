import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';
import { Article } from '../../core/models/article.model';

@Component({
  selector: 'app-article-cms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <main class="article-cms-page">
      <div class="container">
        <header class="cms-header">
          <div>
            <a routerLink="/admin/dashboard" class="back-link">&larr; Back to Dashboard</a>
            <h1>Technical Writing CMS Manager</h1>
          </div>
          <button class="btn btn-primary btn-sm" (click)="openCreateModal()">+ Create New Article</button>
        </header>

        <div class="table-container glass-card">
          <table class="cms-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Read Time</th>
                <th>Published Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let a of articles()">
                <td><strong>{{ a.title }}</strong></td>
                <td><span class="badge badge-cyan">{{ a.category }}</span></td>
                <td>{{ a.readTime }}</td>
                <td>{{ a.publishedAt }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="showModal()" class="modal-backdrop">
          <div class="modal-content glass-card">
            <h3>New Technical Article</h3>
            <form [formGroup]="articleForm" (ngSubmit)="saveArticle()">
              <div class="form-group">
                <label>Title *</label>
                <input type="text" formControlName="title" placeholder="Article Title">
              </div>
              <div class="form-grid mt-3">
                <div class="form-group">
                  <label>Slug *</label>
                  <input type="text" formControlName="slug" placeholder="article-slug">
                </div>
                <div class="form-group">
                  <label>Category *</label>
                  <select formControlName="category">
                    <option value="Java">Java</option>
                    <option value="Spring Boot">Spring Boot</option>
                    <option value="Angular">Angular</option>
                    <option value="Databases">Databases</option>
                    <option value="System Design">System Design</option>
                  </select>
                </div>
              </div>
              <div class="form-group mt-3">
                <label>Summary *</label>
                <textarea rows="2" formControlName="summary"></textarea>
              </div>
              <div class="form-group mt-3">
                <label>Content (Markdown) *</label>
                <textarea rows="6" formControlName="content"></textarea>
              </div>

              <div class="modal-actions mt-6">
                <button type="button" class="btn btn-outline btn-sm" (click)="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm">Publish Article</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .article-cms-page { padding: 130px 0 var(--space-16); }
    .cms-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-8);
      .back-link { font-size: 0.85rem; color: var(--text-secondary); display: block; margin-bottom: 4px; }
      h1 { margin: 0; }
    }
    .table-container { padding: 0; overflow-x: auto; }
    .cms-table {
      width: 100%; border-collapse: collapse; text-align: left;
      th, td { padding: var(--space-4) var(--space-6); border-bottom: 1px solid var(--border-subtle); }
      th { font-size: 0.78rem; text-transform: uppercase; color: var(--text-tertiary); background: var(--bg-surface); }
      td { font-size: 0.9rem; }
    }
    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px);
      z-index: 2000; display: flex; align-items: center; justify-content: center; padding: var(--space-4);
    }
    .modal-content {
      width: 100%; max-width: 640px; padding: var(--space-8);
      background: var(--bg-secondary); border: 1px solid var(--border-medium);
      h3 { margin-bottom: var(--space-4); }
    }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }
    .form-group {
      display: flex; flex-direction: column; gap: 4px;
      label { font-size: 0.8rem; color: var(--text-secondary); }
      input, select, textarea {
        background: var(--bg-surface); border: 1px solid var(--border-medium);
        padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm);
        color: var(--text-primary); font-family: var(--font-body);
      }
    }
    .modal-actions { display: flex; justify-content: flex-end; gap: var(--space-3); }
    .mt-3 { margin-top: var(--space-3); }
    .mt-6 { margin-top: var(--space-6); }
  `]
})
export class ArticleCmsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);

  articles = signal<Article[]>([]);
  showModal = signal<boolean>(false);
  articleForm!: FormGroup;

  ngOnInit() {
    this.seoService.setPageMeta('Article CMS', 'Manage technical articles');

    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      category: ['Spring Boot', Validators.required],
      summary: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.loadArticles();
  }

  loadArticles() {
    this.apiService.getArticles().subscribe(list => this.articles.set(list));
  }

  openCreateModal() {
    this.articleForm.reset({ category: 'Spring Boot' });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveArticle() {
    if (this.articleForm.invalid) return;

    const val = this.articleForm.value;
    const newArt: Article = {
      id: `art-${Date.now()}`,
      title: val.title,
      slug: val.slug,
      category: val.category,
      summary: val.summary,
      content: val.content,
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      tags: [val.category]
    };

    this.apiService.createArticle(newArt).subscribe(() => {
      this.closeModal();
      this.loadArticles();
    });
  }
}
