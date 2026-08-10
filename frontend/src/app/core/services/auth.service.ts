import { Injectable, inject, signal, computed } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabaseService = inject(SupabaseService);
  private readonly TOKEN_KEY = 'mp_admin_token';
  private readonly USER_KEY = 'mp_admin_user';

  currentUser = signal<User | null>(this.getStoredUser());
  isAuthenticated = computed(() => !!this.currentUser());

  constructor() {
    if (this.supabaseService.isConfigured()) {
      // Subscribe to Supabase Auth State Changes
      this.supabaseService.client.auth.onAuthStateChange((event, session) => {
        if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
          const user: User = {
            id: session.user.id,
            username: session.user.email?.split('@')[0] || 'admin',
            email: session.user.email || '',
            token: session.access_token
          };
          this.setSession(user, session.access_token);
        } else if (event === 'SIGNED_OUT') {
          this.clearSession();
        }
      });
    }
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  private setSession(user: User, token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set({ ...user, token });
  }

  private clearSession() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
  }

  async login(credentials: { email: string; password: string }): Promise<User> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Please enter both email and password.');
    }

    if (this.supabaseService.isConfigured()) {
      try {
        const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Email or password is incorrect.');
          }
          throw new Error('Unable to sign in with this account. Please verify credentials.');
        }

        if (data.user && data.session) {
          const user: User = {
            id: data.user.id,
            username: data.user.email?.split('@')[0] || 'admin',
            email: data.user.email || '',
            token: data.session.access_token
          };
          this.setSession(user, data.session.access_token);
          return user;
        }
        throw new Error('Session creation failed. Please try again.');
      } catch (err: any) {
        if (err.message && (err.message.includes('incorrect') || err.message.includes('verify'))) {
          throw err;
        }
        throw new Error('Unable to connect right now. Please try again.');
      }
    } else {
      throw new Error('Supabase project configuration not detected.');
    }
  }

  async resetPassword(email: string): Promise<void> {
    if (!email) {
      throw new Error('Please provide a valid email address.');
    }

    if (this.supabaseService.isConfigured()) {
      const { error } = await this.supabaseService.client.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/login`
      });

      if (error) {
        throw new Error('Unable to send password reset email. Please try again.');
      }
    } else {
      throw new Error('Supabase configuration missing for password reset.');
    }
  }

  async logout(): Promise<void> {
    if (this.supabaseService.isConfigured()) {
      await this.supabaseService.client.auth.signOut();
    }
    this.clearSession();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
