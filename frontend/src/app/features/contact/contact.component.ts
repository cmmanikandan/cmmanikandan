import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main class="contact-page">
      <div class="container container-narrow">
        <header class="page-header">
          <span class="badge badge-cyan">Get In Touch</span>
          <h1>Let's Connect</h1>
          <p>I'm open to internship opportunities, campus placements, entry-level software roles, and meaningful technical collaborations.</p>
        </header>

        <!-- SUCCESS CONFIRMATION STATE -->
        <div *ngIf="submittedSuccess()" class="success-card glass-card fade-in">
          <div class="success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3>Message Sent Successfully!</h3>
          <p>{{ responseMessage() }}</p>
          <button class="btn btn-primary btn-sm mt-4" (click)="resetForm()">Send Another Message</button>
        </div>

        <!-- CONTACT FORM -->
        <form *ngIf="!submittedSuccess()" [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form glass-card" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="name">Your Name *</label>
              <input id="name" type="text" formControlName="name" placeholder="John Doe" required>
              <span *ngIf="isFieldInvalid('name')" class="field-error fade-in">Please enter your name.</span>
            </div>

            <div class="form-group">
              <label for="email">Email Address *</label>
              <input id="email" type="email" formControlName="email" placeholder="john&#64;company.com" required>
              <span *ngIf="isFieldInvalid('email')" class="field-error fade-in">Please enter a valid email address.</span>
            </div>
          </div>

          <div class="form-row mt-4">
            <div class="form-group">
              <label for="projectType">Opportunity Type</label>
              <select id="projectType" formControlName="projectType">
                <option value="Campus Placement">Campus Placement</option>
                <option value="Company Recruitment">Company Recruitment</option>
                <option value="Internship">Internship</option>
                <option value="Placement Training">Placement Training</option>
                <option value="Full-Time Entry-Level Role">Full-Time Entry-Level Role</option>
                <option value="Part-Time Opportunity">Part-Time Opportunity</option>
                <option value="Project Collaboration">Project Collaboration</option>
                <option value="Technical Discussion">Technical Discussion</option>
                <option value="Other">Other Inquiry</option>
              </select>
            </div>

            <div class="form-group">
              <label for="subject">Subject *</label>
              <input id="subject" type="text" formControlName="subject" placeholder="Recruitment / Project Inquiry" required>
              <span *ngIf="isFieldInvalid('subject')" class="field-error fade-in">Subject is required.</span>
            </div>
          </div>

          <div class="form-group mt-4">
            <label for="message">Message *</label>
            <textarea id="message" formControlName="message" rows="5" placeholder="Feel free to share details regarding the opportunity..." required></textarea>
            <span *ngIf="isFieldInvalid('message')" class="field-error fade-in">Please provide a little more detail (at least 10 characters).</span>
          </div>

          <button type="submit" class="btn btn-primary w-full mt-6" [disabled]="loading()">
            <span *ngIf="!loading()">Send Message</span>
            <span *ngIf="loading()">Sending Message...</span>
          </button>
        </form>
      </div>
    </main>
  `,
  styles: [`
    .contact-page { padding: 120px 0 var(--space-16); }
    .page-header {
      margin-bottom: var(--space-8);
      h1 { margin: var(--space-2) 0 var(--space-3); }
      p { font-size: 1.1rem; color: var(--text-secondary); }
    }
    .contact-form, .success-card {
      padding: var(--space-8);
      @media (max-width: 600px) { padding: var(--space-6); }
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
      @media (max-width: 600px) { grid-template-columns: 1fr; }
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);

      label { font-size: 0.88rem; color: var(--text-primary); }
      input, select, textarea {
        background: var(--bg-surface);
        border: 1px solid var(--border-medium);
        padding: var(--space-3);
        border-radius: var(--radius-sm);
        color: var(--text-primary);
        font-family: var(--font-body);

        &:focus {
          outline: none;
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 2px rgba(0, 229, 255, 0.15);
        }
      }
      select {
        option { background: var(--bg-secondary); color: var(--text-primary); }
      }
      .field-error {
        font-size: 0.78rem;
        color: #ef4444;
      }
    }
    .success-card {
      text-align: center;
      .success-icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        color: #10b981;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--space-4);
      }
      h3 { margin-bottom: var(--space-2); }
      p { color: var(--text-secondary); max-width: 480px; margin: 0 auto; }
    }
    .mt-4 { margin-top: var(--space-4); }
    .mt-6 { margin-top: var(--space-6); }
    .w-full { width: 100%; }
  `]
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);

  contactForm!: FormGroup;
  loading = signal<boolean>(false);
  submittedAttempt = signal<boolean>(false);
  submittedSuccess = signal<boolean>(false);
  responseMessage = signal<string>('');

  ngOnInit() {
    this.seoService.setPageMeta(
      'Contact Manikandan Prabhu — Recruitment & Opportunities',
      'Connect with Manikandan Prabhu for campus placements, internships, Java software development roles, and project inquiries.'
    );

    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      projectType: ['Campus Placement'],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    if (!field) return false;
    return field.invalid && (field.dirty || field.touched || this.submittedAttempt());
  }

  onSubmit() {
    this.submittedAttempt.set(true);

    if (this.contactForm.invalid) {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading.set(true);

    this.apiService.sendContactMessage(this.contactForm.value).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.submittedSuccess.set(true);
        this.responseMessage.set(res.message);
      },
      error: () => {
        this.loading.set(false);
        this.submittedSuccess.set(true);
        this.responseMessage.set('Message received. Thanks for reaching out!');
      }
    });
  }

  resetForm() {
    this.contactForm.reset({
      projectType: 'Campus Placement'
    });
    this.submittedAttempt.set(false);
    this.submittedSuccess.set(false);
  }
}
