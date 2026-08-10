import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="admin-dashboard-page">
      <div class="container">
        <!-- Dashboard Top Header -->
        <header class="dash-header">
          <div>
            <span class="badge badge-cyan">CMS Control Center</span>
            <h1>Admin Dashboard</h1>
            <p>Authenticated as <strong>{{ authService.currentUser()?.username }}</strong> ({{ authService.currentUser()?.email }})</p>
          </div>

          <div class="dash-actions">
            <button class="btn btn-outline btn-sm" (click)="logout()">Sign Out</button>
          </div>
        </header>

        <!-- STATS METRICS GRID -->
        <div class="metrics-grid" *ngIf="stats()">
          <div class="metric-card glass-card">
            <span class="metric-label">Total Projects</span>
            <span class="metric-value">{{ stats()!.projectsCount }}</span>
            <a routerLink="/admin/projects" class="metric-link">Manage Projects &rarr;</a>
          </div>

          <div class="metric-card glass-card">
            <span class="metric-label">Published Articles</span>
            <span class="metric-value">{{ stats()!.articlesCount }}</span>
            <a routerLink="/admin/writing" class="metric-link">Manage Articles &rarr;</a>
          </div>

          <div class="metric-card glass-card">
            <span class="metric-label">Contact Messages</span>
            <span class="metric-value">{{ stats()!.messagesCount }}</span>
            <a routerLink="/admin/messages" class="metric-link">View Inbox ({{ stats()!.unreadMessagesCount }} unread) &rarr;</a>
          </div>

          <div class="metric-card glass-card">
            <span class="metric-label">PostgreSQL Database</span>
            <span class="metric-value color-emerald">Online</span>
            <span class="metric-sub">REST API v1 Active</span>
          </div>
        </div>

        <!-- QUICK MANAGEMENT CARDS -->
        <div class="management-grid mt-8">
          <div class="manage-card glass-card">
            <h3>Projects &amp; Case Studies</h3>
            <p>Create, edit, publish, or delete portfolio case studies backed by PostgreSQL database storage.</p>
            <a routerLink="/admin/projects" class="btn btn-primary btn-sm mt-4">Manage Projects</a>
          </div>

          <div class="manage-card glass-card">
            <h3>Technical Writing CMS</h3>
            <p>Publish engineering articles, code guides, and database architectural tutorials.</p>
            <a routerLink="/admin/writing" class="btn btn-primary btn-sm mt-4">Manage Articles</a>
          </div>

          <div class="manage-card glass-card">
            <h3>Contact Messages Inbox</h3>
            <p>Review incoming recruiter inquiries, consulting requests, and project leads.</p>
            <a routerLink="/admin/messages" class="btn btn-primary btn-sm mt-4">View Inbox</a>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .admin-dashboard-page { padding: 130px 0 var(--space-16); }
    .dash-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: var(--space-8);
      h1 { margin: var(--space-2) 0; }
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-6);

      @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 600px) { grid-template-columns: 1fr; }
    }
    .metric-card {
      padding: var(--space-6);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);

      .metric-label { font-size: 0.8rem; color: var(--text-tertiary); text-transform: uppercase; }
      .metric-value { font-family: var(--font-mono); font-size: 2.2rem; font-weight: 700; color: var(--accent-cyan);
        &.color-emerald { color: var(--accent-emerald); }
      }
      .metric-link { font-size: 0.85rem; color: var(--text-secondary); margin-top: auto; }
      .metric-sub { font-size: 0.8rem; color: var(--text-tertiary); }
    }
    .management-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-6);

      @media (max-width: 868px) { grid-template-columns: 1fr; }
    }
    .manage-card { padding: var(--space-6); }
    .mt-4 { margin-top: var(--space-4); }
    .mt-8 { margin-top: var(--space-8); }
  `]
})
export class AdminDashboardComponent implements OnInit {
  authService = inject(AuthService);
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);

  stats = signal<any>(null);

  ngOnInit() {
    this.seoService.setPageMeta('Admin Dashboard', 'CMS Overview metrics');

    this.apiService.getAdminStats().subscribe(s => {
      this.stats.set(s);
    });
  }

  async logout() {
    await this.authService.logout();
    window.location.href = '/admin/login';
  }
}
