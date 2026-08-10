import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-uses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="uses-page">
      <div class="container container-narrow">
        <header class="page-header">
          <span class="badge badge-cyan">Engineering Setup</span>
          <h1>Hardware, Software &amp; Developer Tools</h1>
          <p>A detailed breakdown of the development tools, editor setups, databases, and hardware I rely on to build production software.</p>
        </header>

        <div class="uses-sections">
          <section class="uses-block glass-card">
            <h3>Development Environment &amp; IDEs</h3>
            <ul class="uses-list">
              <li><strong>IntelliJ IDEA Ultimate:</strong> Primary IDE for Java enterprise development, Spring Boot profiling, JPA inspection, and Maven dependencies.</li>
              <li><strong>VS Code / Cursor:</strong> Primary editor for Angular 18+ TypeScript, SCSS design systems, and frontend component development.</li>
              <li><strong>JetBrains Mono Font:</strong> Customized ligatures for crisp code readability.</li>
            </ul>
          </section>

          <section class="uses-block glass-card mt-6">
            <h3>Database &amp; API Tools</h3>
            <ul class="uses-list">
              <li><strong>PostgreSQL 16 &amp; pgAdmin 4:</strong> Primary relational database engine for schema management and query execution plan analysis (\`EXPLAIN ANALYZE\`).</li>
              <li><strong>Redis &amp; Redis Insight:</strong> In-memory key-value cache inspection for financial analytics and session stores.</li>
              <li><strong>Postman &amp; Swagger UI:</strong> API testing, header manipulation, JWT authorization testing, and REST documentation generation.</li>
            </ul>
          </section>

          <section class="uses-block glass-card mt-6">
            <h3>DevOps &amp; Infrastructure</h3>
            <ul class="uses-list">
              <li><strong>Docker &amp; Docker Desktop:</strong> Multi-container environment isolation for local database instances and production container builds.</li>
              <li><strong>Git &amp; GitHub:</strong> Version control with structured commit conventions (\`feat:\`, \`fix:\`, \`refactor:\`).</li>
              <li><strong>Terminal &amp; PowerShell:</strong> Command line automation, Maven build scripts, and CLI tooling.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .uses-page { padding: 140px 0 var(--space-16); }
    .page-header { margin-bottom: var(--space-8); }
    .uses-block {
      padding: var(--space-6);

      h3 {
        color: var(--accent-cyan);
        margin-bottom: var(--space-3);
      }

      .uses-list {
        padding-left: var(--space-4);
        display: flex;
        flex-direction: column;
        gap: var(--space-2);

        li { color: var(--text-secondary); font-size: 0.98rem; }
      }
    }
    .mt-6 { margin-top: var(--space-6); }
  `]
})
export class UsesComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setPageMeta('Uses — Workstation & Developer Setup', 'Developer setup, IDE configuration, database tools, and software used by Manikandan Prabhu.');
  }
}
