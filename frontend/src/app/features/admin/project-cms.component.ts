import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-project-cms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <main class="project-cms-page">
      <div class="container">
        <header class="cms-header">
          <div>
            <a routerLink="/admin/dashboard" class="back-link">&larr; Back to Dashboard</a>
            <h1>Project CMS Manager</h1>
          </div>
          <button class="btn btn-primary btn-sm" (click)="openCreateModal()">+ Create New Project</button>
        </header>

        <!-- DATA TABLE -->
        <div class="table-container glass-card">
          <table class="cms-table">
            <thead>
              <tr>
                <th>Num</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of projects()">
                <td class="mono-cell">{{ p.number }}</td>
                <td><strong>{{ p.title }}</strong></td>
                <td><span class="badge badge-cyan">{{ p.category }}</span></td>
                <td><span class="badge badge-emerald">{{ p.status }}</span></td>
                <td>{{ p.role }}</td>
                <td class="actions-cell">
                  <button class="btn btn-outline btn-xs" (click)="deleteProject(p.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- CREATE / EDIT MODAL FORM -->
        <div *ngIf="showModal()" class="modal-backdrop">
          <div class="modal-content glass-card">
            <h3>{{ isEditMode() ? 'Edit Project' : 'New Case Study Project' }}</h3>

            <form [formGroup]="projectForm" (ngSubmit)="saveProject()">
              <div class="form-grid">
                <div class="form-group">
                  <label>Title *</label>
                  <input type="text" formControlName="title" placeholder="Project Name">
                </div>
                <div class="form-group">
                  <label>Slug *</label>
                  <input type="text" formControlName="slug" placeholder="project-slug">
                </div>
              </div>

              <div class="form-grid mt-3">
                <div class="form-group">
                  <label>One-Liner *</label>
                  <input type="text" formControlName="oneLiner" placeholder="Short positioning headline">
                </div>
                <div class="form-group">
                  <label>Category *</label>
                  <select formControlName="category">
                    <option value="Full Stack">Full Stack</option>
                    <option value="Enterprise Platform">Enterprise Platform</option>
                    <option value="Systems & APIs">Systems &amp; APIs</option>
                    <option value="Product Architecture">Product Architecture</option>
                  </select>
                </div>
              </div>

              <div class="form-group mt-3">
                <label>Summary *</label>
                <textarea rows="3" formControlName="summary"></textarea>
              </div>

              <div class="modal-actions mt-6">
                <button type="button" class="btn btn-outline btn-sm" (click)="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .project-cms-page { padding: 130px 0 var(--space-16); }
    .cms-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: var(--space-8);
      .back-link { font-size: 0.85rem; color: var(--text-secondary); display: block; margin-bottom: 4px; }
      h1 { margin: 0; }
    }
    .table-container { padding: 0; overflow-x: auto; }
    .cms-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      th, td { padding: var(--space-4) var(--space-6); border-bottom: 1px solid var(--border-subtle); }
      th { font-size: 0.78rem; text-transform: uppercase; color: var(--text-tertiary); background: var(--bg-surface); }
      td { font-size: 0.9rem; }
      .mono-cell { font-family: var(--font-mono); color: var(--accent-cyan); }
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
    .btn-xs { padding: 2px var(--space-3); font-size: 0.75rem; }
    .mt-3 { margin-top: var(--space-3); }
    .mt-6 { margin-top: var(--space-6); }
  `]
})
export class ProjectCmsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);

  projects = signal<Project[]>([]);
  showModal = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  projectForm!: FormGroup;

  ngOnInit() {
    this.seoService.setPageMeta('Project CMS', 'Manage portfolio projects');

    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      oneLiner: ['', Validators.required],
      category: ['Full Stack', Validators.required],
      summary: ['', Validators.required]
    });

    this.loadProjects();
  }

  loadProjects() {
    this.apiService.getProjects().subscribe(list => this.projects.set(list));
  }

  openCreateModal() {
    this.isEditMode.set(false);
    this.projectForm.reset({ category: 'Full Stack' });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveProject() {
    if (this.projectForm.invalid) return;

    const val = this.projectForm.value;
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      number: `0${this.projects().length + 1}`,
      title: val.title,
      slug: val.slug,
      oneLiner: val.oneLiner,
      category: val.category,
      role: 'Lead Developer',
      timeline: '3 Months',
      status: 'Production',
      featured: true,
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL'],
      thumbnailUrl: '',
      heroImageUrl: '',
      summary: val.summary
    };

    this.apiService.createProject(newProj).subscribe(() => {
      this.closeModal();
      this.loadProjects();
    });
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.apiService.deleteProject(id).subscribe(() => this.loadProjects());
    }
  }
}
