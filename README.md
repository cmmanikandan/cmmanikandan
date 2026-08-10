# Manikandan Prabhu — Personal Technology & Placement Platform

> **Full Stack Developer** | 3rd-Year B.Tech Information Technology Student at M. Kumarasamy College of Engineering (MKCE), Karur.

A production-grade personal technology portfolio, placement profile, and content management system built with **Angular 18+**, **TypeScript**, **Java Spring Boot**, **Supabase (PostgreSQL, Auth, RLS)**, and **Vercel**.

---

## 🌟 Key Features & Architecture

- **Angular 18+ Frontend**: Built with standalone component architecture, Angular Signals reactivity, and obsidian SCSS design tokens.
- **Placement & Recruiter Profile**: Includes 20-second Recruiter Snapshot, Career Objective, Candidate Value Pillars, and Core CS Interview Preparation (Java OOP, DSA, SQL, DBMS, Web APIs).
- **Featured Case Studies**: Deep technical case studies for **Qubink** (Smart Campus Printing Platform), **FINOVA** (Personal Finance Platform), and **E-Commerce Platform**, featuring Interview Highlights and Future Improvements.
- **Supabase Integration**:
  - PostgreSQL Relational Database Schema (`supabase/schema.sql`)
  - Supabase Auth (Email + Password)
  - Row Level Security (RLS) Policies on all tables
  - Supabase Storage Buckets
- **Protected Admin CMS**: Secure Content Management System (`/admin/login`) with zero exposed credentials.
- **Vercel SPA Deployment**: SPA rewrite rules (`vercel.json`) ensuring deep link routing without 404 errors.

---

## 🚀 Getting Started

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/cmmanikandan/cmmanikandan.git
   cd cmmanikandan
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `frontend/src/environments/environment.ts` and set your Supabase URL & Anon Key.

4. **Launch Local Server**:
   ```bash
   npm start
   ```
   Open `http://localhost:4200` in your browser.

---

## 🗄️ Database Setup (Supabase)

1. Open your [Supabase Dashboard](https://supabase.com).
2. Run the DDL script in `supabase/schema.sql` inside the SQL Query Editor.

---

## 🛠️ Built With

- **Frontend**: Angular 18, TypeScript, SCSS
- **Backend & Database**: Java 17, Spring Boot, Supabase, PostgreSQL
- **Deployment**: Vercel

---
© 2026 Manikandan Prabhu. All rights reserved.
