import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NodeSpec {
  id: string;
  name: string;
  role: string;
  tech: string;
  description: string;
  metrics: string;
}

@Component({
  selector: 'app-system-diagram',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="system-visualizer glass-card">
      <div class="visualizer-header">
        <div class="title-group">
          <span class="badge badge-cyan">Application Pipeline</span>
          <h3>Full Stack Application Flow</h3>
        </div>
        <p class="subtitle">Interactive breakdown of how Angular, Spring Boot, and PostgreSQL work together in my web applications.</p>
      </div>

      <!-- Node Flow Visual Grid -->
      <div class="nodes-flow">
        <div 
          *ngFor="let node of nodes; let i = index" 
          class="node-card"
          [class.selected]="selectedNode().id === node.id"
          (click)="selectNode(node)">
          <div class="node-icon">
            <span class="node-number">0{{ i + 1 }}</span>
          </div>
          <div class="node-body">
            <span class="node-role">{{ node.role }}</span>
            <span class="node-name">{{ node.name }}</span>
            <span class="node-tech">{{ node.tech }}</span>
          </div>
          <div *ngIf="i < nodes.length - 1" class="flow-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Active Node Detail Panel -->
      <div class="node-detail-panel fade-in">
        <div class="detail-header">
          <div class="detail-title">
            <h4>{{ selectedNode().name }}</h4>
            <span class="badge badge-cyan">{{ selectedNode().tech }}</span>
          </div>
          <span class="metric-tag">{{ selectedNode().metrics }}</span>
        </div>
        <p class="detail-description">{{ selectedNode().description }}</p>
      </div>
    </div>
  `,
  styles: [`
    .system-visualizer {
      padding: var(--space-8);
      margin: var(--space-8) 0;
      border: 1px solid var(--border-medium);
      background: linear-gradient(180deg, rgba(17, 20, 26, 0.9), rgba(11, 13, 16, 0.95));
    }

    .visualizer-header {
      margin-bottom: var(--space-8);

      .title-group {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        margin-bottom: var(--space-2);
      }

      .subtitle {
        font-size: 0.95rem;
        color: var(--text-tertiary);
      }
    }

    .nodes-flow {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-3);
      margin-bottom: var(--space-8);

      @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    .node-card {
      position: relative;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      cursor: pointer;
      transition: all var(--transition-normal);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);

      &:hover {
        border-color: var(--accent-cyan);
        transform: translateY(-2px);
      }

      &.selected {
        border-color: var(--accent-cyan);
        background: rgba(0, 229, 255, 0.05);
        box-shadow: 0 0 16px rgba(0, 229, 255, 0.15);
      }

      .node-number {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--accent-cyan);
      }

      .node-role {
        font-size: 0.75rem;
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .node-name {
        font-family: var(--font-heading);
        font-weight: 600;
        font-size: 1rem;
        color: var(--text-primary);
      }

      .node-tech {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--accent-teal);
      }

      .flow-arrow {
        position: absolute;
        right: -14px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--border-medium);
        z-index: 2;

        @media (max-width: 1024px) {
          display: none;
        }
      }
    }

    .node-detail-panel {
      background: var(--bg-secondary);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: var(--space-6);

      .detail-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-3);

        .detail-title {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .metric-tag {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--accent-cyan);
          background: rgba(0, 229, 255, 0.1);
          padding: 4px var(--space-3);
          border-radius: var(--radius-full);
          border: 1px solid rgba(0, 229, 255, 0.2);
        }
      }

      .detail-description {
        font-size: 0.95rem;
        color: var(--text-secondary);
        line-height: 1.6;
      }
    }
  `]
})
export class SystemDiagramComponent {
  nodes: NodeSpec[] = [
    {
      id: 'n-user',
      name: 'Web Browser',
      role: 'User Interface',
      tech: 'Browser / Client',
      description: 'Users interact with clean web interfaces designed with responsive layouts and clear navigation flows.',
      metrics: 'Responsive UI'
    },
    {
      id: 'n-ui',
      name: 'Angular Frontend',
      role: 'Frontend Layer',
      tech: 'TypeScript & SCSS',
      description: 'Single-page component tree using Angular Signals for state management, Reactive Forms for input validation, and HTTP client services.',
      metrics: 'Angular 18'
    },
    {
      id: 'n-gateway',
      name: 'REST API Layer',
      role: 'API Routing',
      tech: 'Spring Boot REST',
      description: 'RESTful API controllers receiving HTTP requests (GET, POST, PUT, DELETE) and returning JSON response payloads.',
      metrics: 'JSON REST APIs'
    },
    {
      id: 'n-backend',
      name: 'Service Business Logic',
      role: 'Backend Core',
      tech: 'Java & Spring Boot',
      description: 'Java service classes handling application logic, request validations, data calculations, and database repository integration.',
      metrics: 'Java 17 Core'
    },
    {
      id: 'n-db',
      name: 'Relational Database',
      role: 'Database Storage',
      tech: 'PostgreSQL / Supabase',
      description: 'Relational tables storing application data, user profiles, transactions, and print orders with primary and foreign keys.',
      metrics: 'PostgreSQL / MySQL'
    }
  ];

  selectedNode = signal<NodeSpec>(this.nodes[1]); // Default to Angular Frontend

  selectNode(node: NodeSpec) {
    this.selectedNode.set(node);
  }
}
