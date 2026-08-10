import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BRAND_CONFIG } from '../../../core/config/brand.config';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a routerLink="/" class="brand-logo" [ngClass]="variant" aria-label="Manikandan Prabhu Homepage">
      <!-- MONOGRAM MARK -->
      <span class="logo-mark">&lt;MP/&gt;</span>

      <!-- BRAND WORDMARK -->
      <div class="logo-text-group" *ngIf="variant !== 'monogram'">
        <span class="brand-name">{{ brand.name }}</span>
        <span *ngIf="variant === 'footer'" class="brand-sub">{{ brand.title }}</span>
      </div>
    </a>
  `,
  styles: [`
    .brand-logo {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      text-decoration: none;
      transition: opacity 200ms ease, transform 200ms ease;

      &:hover {
        opacity: 0.95;
        .logo-mark {
          transform: translateY(-1px);
        }
      }
    }

    .logo-mark {
      font-family: var(--font-mono);
      font-weight: 700;
      color: var(--accent-cyan);
      font-size: 1rem;
      letter-spacing: -0.05em;
      transition: transform 200ms ease;
    }

    .logo-text-group {
      display: flex;
      flex-direction: column;
      line-height: 1.1;

      .brand-name {
        font-family: var(--font-heading);
        font-weight: 700;
        font-size: 1.15rem;
        color: #ffffff;
        letter-spacing: -0.02em;
      }

      .brand-sub {
        font-size: 0.78rem;
        color: var(--text-tertiary);
        margin-top: 2px;
      }
    }

    /* Variant Styles */
    .brand-logo.compact {
      .brand-name {
        font-size: 1.05rem;
      }
    }

    .brand-logo.footer {
      .brand-name {
        font-size: 1.25rem;
      }
    }
  `]
})
export class LogoComponent {
  @Input() variant: 'full' | 'compact' | 'monogram' | 'footer' = 'full';
  brand = BRAND_CONFIG;
}
