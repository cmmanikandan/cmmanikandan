import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-card glass-card">
      <div class="skeleton-visual skeleton-box"></div>
      <div class="skeleton-body">
        <div class="skeleton-line skeleton-box title-line"></div>
        <div class="skeleton-line skeleton-box text-line"></div>
        <div class="skeleton-line skeleton-box text-line-short"></div>
        <div class="skeleton-chips">
          <span class="skeleton-chip skeleton-box"></span>
          <span class="skeleton-chip skeleton-box"></span>
          <span class="skeleton-chip skeleton-box"></span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-6);
      padding: var(--space-8);
      opacity: 0.8;

      @media (max-width: 868px) {
        grid-template-columns: 1fr;
      }
    }

    .skeleton-visual {
      width: 100%;
      height: 220px;
      border-radius: var(--radius-md);
    }

    .skeleton-body {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      justify-content: center;
    }

    .skeleton-line {
      height: 16px;
      border-radius: 4px;

      &.title-line { height: 28px; width: 60%; }
      &.text-line { width: 90%; }
      &.text-line-short { width: 70%; }
    }

    .skeleton-chips {
      display: flex;
      gap: var(--space-2);
      margin-top: var(--space-3);

      .skeleton-chip {
        width: 70px;
        height: 24px;
        border-radius: var(--radius-full);
      }
    }
  `]
})
export class SkeletonLoaderComponent {}
