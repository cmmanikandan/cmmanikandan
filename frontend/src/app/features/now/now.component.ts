import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-now',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="now-page">
      <div class="container container-narrow">
        <header class="page-header">
          <span class="badge badge-cyan">Current Focus</span>
          <h1>What I'm Doing Now</h1>
          <p>An updated snapshot of my active engineering projects, learning goals, and career focus. Updated August 2026.</p>
        </header>

        <article class="now-card glass-card">
          <h3>Active Engineering Projects</h3>
          <ul class="now-list">
            <li>Enhancing <strong>Qubink</strong> with multi-tenant campus isolation and automated printer ink usage telemetry.</li>
            <li>Writing technical articles on Spring Boot 3.2 security filter chains and Angular Signals reactivity.</li>
            <li>Exploring advanced PostgreSQL performance tuning, custom index types (GIN/GiST), and query partition strategies.</li>
          </ul>

          <h3 class="mt-6">Current Technical Explorations</h3>
          <ul class="now-list">
            <li>Deep-diving into Spring Cloud Microservice patterns (API Gateways, Eureka Service Discovery, Resilience4j circuit breakers).</li>
            <li>Refining responsive SCSS design token systems and WCAG accessibility standards.</li>
          </ul>
        </article>
      </div>
    </main>
  `,
  styles: [`
    .now-page { padding: 140px 0 var(--space-16); }
    .page-header { margin-bottom: var(--space-8); }
    .now-card {
      padding: var(--space-8);

      h3 {
        color: var(--accent-cyan);
        margin-bottom: var(--space-3);
      }

      .now-list {
        padding-left: var(--space-4);
        display: flex;
        flex-direction: column;
        gap: var(--space-2);

        li { color: var(--text-secondary); font-size: 1rem; }
      }
    }
    .mt-6 { margin-top: var(--space-6); }
  `]
})
export class NowComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setPageMeta('Now — Current Focus & Explorations', 'What Manikandan Prabhu is currently building, studying, and focusing on.');
  }
}
