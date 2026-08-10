import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container footer-grid">
        <!-- Brand & Positioning -->
        <div class="footer-brand">
          <a routerLink="/" class="logo">
            <span class="logo-mark">&lt;MP/&gt;</span>
            <span class="logo-text">Manikandan Prabhu</span>
          </a>
          <p class="positioning">
            Full Stack Developer focused on Java, web development, databases, and practical digital products.
          </p>
          <div class="status-indicator">
            <span class="pulse-dot"></span>
            <span>Open to internship and career opportunities</span>
          </div>
        </div>

        <!-- Navigation Columns -->
        <div class="footer-nav">
          <div class="nav-column">
            <h6>Navigation</h6>
            <a routerLink="/work">Selected Work</a>
            <a routerLink="/engineering">Development Process</a>
            <a routerLink="/about">About</a>
            <a routerLink="/experience">Projects &amp; Education</a>
            <a routerLink="/writing">Writing</a>
          </div>

          <div class="nav-column">
            <h6>Explore</h6>
            <a routerLink="/resume">Resume</a>
            <a routerLink="/uses">Uses &amp; Setup</a>
            <a routerLink="/now">Now</a>
            <a routerLink="/contact">Get In Touch</a>
            <a routerLink="/admin/login" class="admin-link">Admin CMS</a>
          </div>

          <div class="nav-column">
            <h6>Connect</h6>
            <a href="https://github.com/cmmanikandan" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/manikandanprabhu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:manikandanprabhu.dev@gmail.com">Email Direct</a>
          </div>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>&copy; {{ currentYear }} Manikandan Prabhu. Built with Angular • TypeScript • Supabase.</p>
        <p class="location">3rd-Year Student • India</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-subtle);
      padding: var(--space-16) 0 var(--space-8);
      margin-top: var(--space-24);
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 2fr;
      gap: var(--space-12);
      margin-bottom: var(--space-12);

      @media (max-width: 868px) {
        grid-template-columns: 1fr;
        gap: var(--space-8);
      }
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);

      .logo {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-family: var(--font-heading);
        font-weight: 700;
        font-size: 1.25rem;
        color: var(--text-primary);
        text-decoration: none;

        .logo-mark {
          font-family: var(--font-mono);
          color: var(--accent-cyan);
        }
      }

      .positioning {
        max-width: 380px;
        font-size: 0.95rem;
        color: var(--text-secondary);
      }

      .status-indicator {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        font-size: 0.85rem;
        color: var(--text-tertiary);

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-emerald);
          box-shadow: 0 0 10px var(--accent-emerald);
        }
      }
    }

    .footer-nav {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-6);

      @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
      }

      .nav-column {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);

        h6 {
          margin-bottom: var(--space-2);
        }

        a {
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-decoration: none;

          &:hover {
            color: var(--accent-cyan);
          }

          &.admin-link {
            color: var(--text-muted);
            font-size: 0.8rem;
          }
        }
      }
    }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: var(--space-6);
      border-top: 1px solid var(--border-subtle);
      font-size: 0.85rem;
      color: var(--text-tertiary);

      @media (max-width: 600px) {
        flex-direction: column;
        gap: var(--space-2);
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
