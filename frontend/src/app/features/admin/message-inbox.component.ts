import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';
import { ContactMessage } from '../../core/models/message.model';

@Component({
  selector: 'app-message-inbox',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="inbox-page">
      <div class="container">
        <header class="cms-header">
          <div>
            <a routerLink="/admin/dashboard" class="back-link">&larr; Back to Dashboard</a>
            <h1>Contact Messages Inbox</h1>
          </div>
        </header>

        <div class="inbox-container glass-card">
          <div *ngIf="messages().length === 0" class="empty-inbox">
            <p>No messages received yet.</p>
          </div>

          <div *ngFor="let m of messages()" class="message-card">
            <div class="msg-header">
              <div>
                <strong>{{ m.name }}</strong> &lt;{{ m.email }}&gt;
                <span class="badge badge-cyan ml-2">{{ m.projectType || 'General Inquiry' }}</span>
              </div>
              <span class="date">{{ m.createdAt }}</span>
            </div>
            <h4>{{ m.subject }}</h4>
            <p class="body">{{ m.message }}</p>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .inbox-page { padding: 130px 0 var(--space-16); }
    .cms-header { margin-bottom: var(--space-8);
      .back-link { font-size: 0.85rem; color: var(--text-secondary); display: block; margin-bottom: 4px; }
      h1 { margin: 0; }
    }
    .inbox-container {
      display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-6);
    }
    .message-card {
      background: var(--bg-surface); border: 1px solid var(--border-subtle);
      padding: var(--space-6); border-radius: var(--radius-md);
      display: flex; flex-direction: column; gap: var(--space-2);

      .msg-header {
        display: flex; justify-content: space-between; align-items: center;
        font-size: 0.9rem; color: var(--text-secondary);
        .date { font-size: 0.8rem; color: var(--text-tertiary); }
      }
      h4 { margin: var(--space-1) 0; color: var(--text-primary); }
      .body { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; }
    }
    .empty-inbox { padding: var(--space-8); text-align: center; color: var(--text-tertiary); }
    .ml-2 { margin-left: var(--space-2); }
  `]
})
export class MessageInboxComponent implements OnInit {
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);

  messages = signal<ContactMessage[]>([]);

  ngOnInit() {
    this.seoService.setPageMeta('Messages Inbox', 'Contact submissions');

    this.apiService.getMessages().subscribe(list => this.messages.set(list));
  }
}
