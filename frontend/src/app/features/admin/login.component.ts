import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main class="login-page">
      <div class="container container-narrow">
        <div class="login-card glass-card">
          <!-- BRAND LOGO -->
          <div class="brand-logo">
            <span class="logo-mark">&lt;MP/&gt;</span>
          </div>

          <div class="card-header">
            <span class="badge badge-cyan">Protected CMS</span>
            <h2>Admin Sign In</h2>
            <p>Secure access to the portfolio content management system.</p>
          </div>

          <!-- MAIN LOGIN FORM -->
          <form *ngIf="!showForgotPassword()" [formGroup]="loginForm" (ngSubmit)="onLogin()" aria-label="Admin Sign In Form">
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                id="email" 
                type="email" 
                formControlName="email" 
                placeholder="admin@example.com"
                autocomplete="email"
                required>
            </div>

            <div class="form-group mt-4">
              <label for="password">Password</label>
              <div class="password-input-wrapper">
                <input 
                  id="password" 
                  [type]="showPassword() ? 'text' : 'password'" 
                  formControlName="password" 
                  placeholder="••••••••"
                  autocomplete="current-password"
                  required>
                <button 
                  type="button" 
                  class="password-toggle-btn" 
                  (click)="togglePasswordVisibility()" 
                  [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'">
                  <svg *ngIf="!showPassword()" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg *ngIf="showPassword()" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <div *ngIf="errorMessage()" class="error-banner mt-4" role="alert">
              {{ errorMessage() }}
            </div>

            <div class="forgot-row mt-4">
              <button type="button" class="btn-link" (click)="toggleForgotMode(true)">Forgot password?</button>
            </div>

            <button type="submit" class="btn btn-primary w-full mt-6" [disabled]="loading()">
              <span *ngIf="!loading()">Sign in to CMS</span>
              <span *ngIf="loading()">Authenticating...</span>
            </button>
          </form>

          <!-- FORGOT PASSWORD FORM -->
          <div *ngIf="showForgotPassword()" class="forgot-container">
            <h3>Reset Password</h3>
            <p class="forgot-desc">Enter your admin email address to receive a secure password reset link.</p>

            <div *ngIf="resetSuccess()" class="success-banner mt-4">
              Password reset link sent! Check your email inbox.
            </div>

            <form [formGroup]="forgotForm" (ngSubmit)="onResetPassword()">
              <div class="form-group mt-4">
                <label for="resetEmail">Admin Email</label>
                <input id="resetEmail" type="email" formControlName="resetEmail" placeholder="admin@example.com">
              </div>

              <div *ngIf="errorMessage()" class="error-banner mt-4">
                {{ errorMessage() }}
              </div>

              <button type="submit" class="btn btn-primary w-full mt-6" [disabled]="loading()">
                <span *ngIf="!loading()">Send Reset Link</span>
                <span *ngIf="loading()">Sending...</span>
              </button>

              <button type="button" class="btn btn-outline w-full mt-3" (click)="toggleForgotMode(false)">
                Back to Sign In
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  `,
  styles: [`
    .login-page { padding: 160px 0 var(--space-16); }
    .login-card {
      padding: var(--space-8);
      max-width: 460px;
      margin: 0 auto;

      .brand-logo {
        text-align: center;
        margin-bottom: var(--space-3);
        .logo-mark {
          font-family: var(--font-mono);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--accent-cyan);
        }
      }

      .card-header {
        text-align: center;
        margin-bottom: var(--space-6);

        h2 { margin: var(--space-2) 0; }
        p { font-size: 0.9rem; color: var(--text-secondary); }
      }
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);

      label { font-size: 0.88rem; color: var(--text-primary); }
      input {
        background: var(--bg-surface);
        border: 1px solid var(--border-medium);
        padding: var(--space-3);
        border-radius: var(--radius-md);
        color: var(--text-primary);
        font-family: var(--font-body);

        &:focus {
          outline: none;
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 2px rgba(0, 229, 255, 0.15);
        }
      }
    }

    .password-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;

      input {
        width: 100%;
        padding-right: 44px;
      }

      .password-toggle-btn {
        position: absolute;
        right: 12px;
        background: none;
        border: none;
        color: var(--text-tertiary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          color: var(--accent-cyan);
        }
      }
    }

    .error-banner {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #fca5a5;
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-size: 0.85rem;
    }

    .success-banner {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #6ee7b7;
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-size: 0.85rem;
    }

    .forgot-row {
      display: flex;
      justify-content: flex-end;

      .btn-link {
        background: none;
        border: none;
        color: var(--accent-cyan);
        font-size: 0.85rem;
        cursor: pointer;
        padding: 0;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .forgot-container {
      h3 { margin-bottom: var(--space-2); }
      .forgot-desc { font-size: 0.9rem; color: var(--text-secondary); }
    }

    .mt-3 { margin-top: var(--space-3); }
    .mt-4 { margin-top: var(--space-4); }
    .mt-6 { margin-top: var(--space-6); }
    .w-full { width: 100%; }
  `]
})
export class AdminLoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);

  loginForm!: FormGroup;
  forgotForm!: FormGroup;
  loading = signal<boolean>(false);
  showPassword = signal<boolean>(false);
  showForgotPassword = signal<boolean>(false);
  resetSuccess = signal<boolean>(false);
  errorMessage = signal<string>('');

  ngOnInit() {
    this.seoService.setPageMeta('Admin Sign In', 'Secure CMS Authentication Portal.');

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.forgotForm = this.fb.group({
      resetEmail: ['', [Validators.required, Validators.email]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword.update(val => !val);
  }

  toggleForgotMode(forgot: boolean) {
    this.showForgotPassword.set(forgot);
    this.errorMessage.set('');
    this.resetSuccess.set(false);
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage.set('Please provide a valid email and password.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.login(this.loginForm.value);
      this.loading.set(false);
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
      this.router.navigateByUrl(returnUrl);
    } catch (err: any) {
      this.loading.set(false);
      this.errorMessage.set(err.message || 'Email or password is incorrect.');
    }
  }

  async onResetPassword() {
    if (this.forgotForm.invalid) {
      this.errorMessage.set('Please provide a valid email address.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.resetPassword(this.forgotForm.value.resetEmail);
      this.loading.set(false);
      this.resetSuccess.set(true);
    } catch (err: any) {
      this.loading.set(false);
      this.errorMessage.set(err.message || 'Unable to send password reset email.');
    }
  }
}
