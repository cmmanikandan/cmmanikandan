import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header [class.scrolled]="isScrolled()" class="header">
      <div class="container header-content">
        <!-- Logo / Brand Wordmark -->
        <a routerLink="/" class="logo" aria-label="Manikandan Prabhu Homepage">
          <span class="logo-mark">&lt;MP/&gt;</span>
          <span class="logo-text">Manikandan Prabhu</span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="desktop-nav" aria-label="Main Navigation">
          <a routerLink="/work" routerLinkActive="active" class="nav-link">Work</a>
          <a routerLink="/engineering" routerLinkActive="active" class="nav-link">Engineering</a>
          <a routerLink="/about" routerLinkActive="active" class="nav-link">About</a>
          <a routerLink="/experience" routerLinkActive="active" class="nav-link">Experience</a>
          <a routerLink="/writing" routerLinkActive="active" class="nav-link">Writing</a>
          <a routerLink="/contact" routerLinkActive="active" class="nav-link">Contact</a>
        </nav>

        <!-- Right Side Actions -->
        <div class="nav-actions">
          <a routerLink="/resume" class="btn btn-outline btn-sm">Resume</a>
          <a routerLink="/contact" class="btn btn-primary btn-sm">Let's talk</a>

          <!-- Mobile Hamburger Toggle -->
          <button 
            type="button" 
            class="mobile-toggle" 
            [attr.aria-expanded]="mobileMenuOpen()" 
            aria-label="Toggle Navigation Menu"
            (click)="toggleMobileMenu()">
            <span class="bar" [class.open]="mobileMenuOpen()"></span>
            <span class="bar" [class.open]="mobileMenuOpen()"></span>
            <span class="bar" [class.open]="mobileMenuOpen()"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer Sheet -->
      <div class="mobile-drawer" [class.open]="mobileMenuOpen()">
        <div class="drawer-backdrop" (click)="closeMobileMenu()"></div>
        <div class="drawer-content">
          <nav aria-label="Mobile Navigation">
            <a routerLink="/" (click)="closeMobileMenu()" class="drawer-link">Home</a>
            <a routerLink="/work" (click)="closeMobileMenu()" class="drawer-link">Work / Projects</a>
            <a routerLink="/engineering" (click)="closeMobileMenu()" class="drawer-link">Engineering Philosophy</a>
            <a routerLink="/about" (click)="closeMobileMenu()" class="drawer-link">About Me</a>
            <a routerLink="/experience" (click)="closeMobileMenu()" class="drawer-link">Experience</a>
            <a routerLink="/writing" (click)="closeMobileMenu()" class="drawer-link">Writing</a>
            <a routerLink="/resume" (click)="closeMobileMenu()" class="drawer-link">Resume</a>
            <a routerLink="/contact" (click)="closeMobileMenu()" class="drawer-link btn btn-primary mt-4">Let's Work Together</a>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      padding: var(--space-4) 0;
      transition: all var(--transition-normal);
      background: rgba(11, 13, 16, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);

      &.scrolled {
        padding: var(--space-3) 0;
        background: rgba(11, 13, 16, 0.9);
        border-bottom: 1px solid var(--border-subtle);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      }
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 1.15rem;
      color: var(--text-primary);
      text-decoration: none;

      .logo-mark {
        font-family: var(--font-mono);
        color: var(--accent-cyan);
        font-size: 0.95rem;
      }
    }

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: var(--space-6);

      @media (max-width: 868px) {
        display: none;
      }
    }

    .nav-link {
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 200ms ease;
      position: relative;
      padding: 4px 0;

      &:hover {
        color: var(--text-primary);
      }

      &.active {
        color: var(--accent-cyan);
        font-weight: 600;

        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent-cyan);
          border-radius: var(--radius-full);
          box-shadow: 0 0 8px rgba(0, 229, 255, 0.5);
        }
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .btn-sm {
      padding: 6px var(--space-4);
      font-size: 0.85rem;

      @media (max-width: 600px) {
        &.btn-outline { display: none; }
      }
    }

    .mobile-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-around;
      width: 32px;
      height: 32px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 4px;
      z-index: 1100;

      @media (max-width: 868px) {
        display: flex;
      }

      .bar {
        width: 100%;
        height: 2px;
        background-color: var(--text-primary);
        border-radius: 2px;
        transition: all 0.3s ease;

        &.open:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        &.open:nth-child(2) { opacity: 0; }
        &.open:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
      }
    }

    /* Mobile Drawer */
    .mobile-drawer {
      position: fixed;
      inset: 0;
      z-index: 1050;
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s ease;

      &.open {
        visibility: visible;
        opacity: 1;
      }

      .drawer-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
      }

      .drawer-content {
        position: absolute;
        top: 0;
        right: 0;
        width: 80%;
        max-width: 340px;
        height: 100%;
        background: var(--bg-secondary);
        border-left: 1px solid var(--border-medium);
        padding: 80px var(--space-6) var(--space-6);
        box-shadow: var(--shadow-lg);

        nav {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .drawer-link {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-secondary);

          &:hover {
            color: var(--accent-cyan);
          }
        }
      }
    }
  `]
})
export class HeaderComponent {
  isScrolled = signal<boolean>(false);
  mobileMenuOpen = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
