-- Supabase PostgreSQL Relational Schema DDL & Idempotent Seed Data
-- Manikandan Prabhu Technology Platform (Project Ref: fpinunyqekerbmaaeqmc)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (With Role Authorization)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'public', -- 'admin' or 'public'
    name VARCHAR(150) NOT NULL DEFAULT 'Manikandan Prabhu',
    headline VARCHAR(255) NOT NULL DEFAULT 'Full Stack Developer',
    bio TEXT NOT NULL DEFAULT '3rd-year Information Technology student at M. Kumarasamy College of Engineering (MKCE), Karur, focused on Java, Spring Boot, Angular, PostgreSQL, and practical web applications.',
    location VARCHAR(150) NOT NULL DEFAULT 'India',
    email VARCHAR(150) NOT NULL DEFAULT 'manikandanprabhu.dev@gmail.com',
    availability VARCHAR(150) NOT NULL DEFAULT 'Open to internships & placement opportunities',
    profile_image_url TEXT,
    resume_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    project_number VARCHAR(10) NOT NULL DEFAULT '01',
    one_liner VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT,
    category VARCHAR(50) NOT NULL,
    year VARCHAR(20) NOT NULL DEFAULT '2026',
    role VARCHAR(100) NOT NULL DEFAULT 'Full Stack Developer',
    status VARCHAR(50) NOT NULL DEFAULT 'Completed',
    featured BOOLEAN DEFAULT FALSE,
    thumbnail_url TEXT,
    hero_image_url TEXT,
    github_url TEXT,
    live_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENSURE ALTER SAFETY FOR PRE-EXISTING TABLES IN SUPABASE
ALTER TABLE public.projects ALTER COLUMN status TYPE VARCHAR(50);
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_status_check;
ALTER TABLE public.projects ADD CONSTRAINT projects_status_check CHECK (status IN ('draft', 'published', 'Completed', 'In Development', 'archived', 'completed', 'in_development'));

-- 3. PROJECT TECHNOLOGIES TABLE
CREATE TABLE IF NOT EXISTS public.project_technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    sort_order INT DEFAULT 0
);

-- 4. PROJECT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    caption TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CASE STUDIES TABLE
CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL UNIQUE REFERENCES public.projects(id) ON DELETE CASCADE,
    problem TEXT NOT NULL,
    context TEXT NOT NULL,
    architecture_overview TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CASE STUDY SECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.case_study_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_study_id UUID NOT NULL REFERENCES public.case_studies(id) ON DELETE CASCADE,
    section_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    payload JSONB DEFAULT '{}'::jsonb,
    sort_order INT DEFAULT 0
);

-- 7. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization VARCHAR(150) NOT NULL,
    role VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('independent', 'internship', 'project', 'education', 'other')),
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    responsibilities TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    location VARCHAR(100) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    category VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'published',
    published_at VARCHAR(50) NOT NULL,
    reading_time VARCHAR(30) NOT NULL,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENSURE ALTER SAFETY FOR ARTICLES PRE-EXISTING TABLES IN SUPABASE
ALTER TABLE public.articles ALTER COLUMN status TYPE VARCHAR(50);
ALTER TABLE public.articles DROP CONSTRAINT IF EXISTS articles_status_check;
ALTER TABLE public.articles ADD CONSTRAINT articles_status_check CHECK (status IN ('draft', 'published', 'archived', 'Published', 'Draft'));

-- 9. MESSAGES TABLE (Strict RLS: Public INSERT Only, Admin SELECT/UPDATE/DELETE Only)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    project_type VARCHAR(100),
    budget_range VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.messages ALTER COLUMN status TYPE VARCHAR(50);
ALTER TABLE public.messages DROP CONSTRAINT IF EXISTS messages_status_check;
ALTER TABLE public.messages ADD CONSTRAINT messages_status_check CHECK (status IN ('new', 'read', 'replied', 'archived', 'New', 'Read', 'Replied'));

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_messages_created ON public.messages(created_at DESC);

-- ROW LEVEL SECURITY (RLS) ENABLEMENT
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_study_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- DROP EXISTING POLICIES TO PREVENT ERROR 42710
DROP POLICY IF EXISTS "Public Read Profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public Read Published Projects" ON public.projects;
DROP POLICY IF EXISTS "Public Read Project Tech" ON public.project_technologies;
DROP POLICY IF EXISTS "Public Read Project Images" ON public.project_images;
DROP POLICY IF EXISTS "Public Read Case Studies" ON public.case_studies;
DROP POLICY IF EXISTS "Public Read Case Study Sections" ON public.case_study_sections;
DROP POLICY IF EXISTS "Public Read Experiences" ON public.experiences;
DROP POLICY IF EXISTS "Public Read Published Articles" ON public.articles;
DROP POLICY IF EXISTS "Public Insert Messages" ON public.messages;

DROP POLICY IF EXISTS "Admin Full Access Profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admin Full Access Projects" ON public.projects;
DROP POLICY IF EXISTS "Admin Full Access Project Tech" ON public.project_technologies;
DROP POLICY IF EXISTS "Admin Full Access Project Images" ON public.project_images;
DROP POLICY IF EXISTS "Admin Full Access Case Studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admin Full Access Case Study Sections" ON public.case_study_sections;
DROP POLICY IF EXISTS "Admin Full Access Experiences" ON public.experiences;
DROP POLICY IF EXISTS "Admin Full Access Articles" ON public.articles;
DROP POLICY IF EXISTS "Admin Full Access Messages" ON public.messages;

-- RE-CREATE PUBLIC READ POLICIES
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Published Projects" ON public.projects FOR SELECT USING (status IN ('published', 'Completed', 'completed', 'In Development'));
CREATE POLICY "Public Read Project Tech" ON public.project_technologies FOR SELECT USING (true);
CREATE POLICY "Public Read Project Images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public Read Case Studies" ON public.case_studies FOR SELECT USING (true);
CREATE POLICY "Public Read Case Study Sections" ON public.case_study_sections FOR SELECT USING (true);
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Published Articles" ON public.articles FOR SELECT USING (status IN ('published', 'Published'));

-- PUBLIC INSERT POLICY FOR MESSAGES (Public can ONLY insert, cannot SELECT/READ)
CREATE POLICY "Public Insert Messages" ON public.messages FOR INSERT WITH CHECK (true);

-- ADMIN FULL ACCESS POLICIES (Strictly for authenticated users)
CREATE POLICY "Admin Full Access Profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Project Tech" ON public.project_technologies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Project Images" ON public.project_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Case Studies" ON public.case_studies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Case Study Sections" ON public.case_study_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Experiences" ON public.experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Articles" ON public.articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Messages" ON public.messages FOR ALL USING (auth.role() = 'authenticated');

-- SEED THE 3 PRIMARY FEATURED PROJECTS (UPSERT ON CONFLICT ID & SLUG)
INSERT INTO public.projects (id, title, slug, project_number, one_liner, short_description, category, year, role, status, featured, github_url, live_url, sort_order)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Qubink', 'qubink', '01', 'Smart Campus Printing Platform', 'Qubink is a smart campus printing platform designed to simplify document submission, printing customization, order management, and pickup workflows for students.', 'Full Stack', '2026', 'Full Stack Developer', 'Completed', true, 'https://github.com/Manikandan-Prabhu/qubink', 'https://qubink.demo.app', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'FINOVA', 'finova', '02', 'Personal Finance & Expense Management Platform', 'FINOVA is a personal finance and expense management application designed to help users record expenses, organize spending, manage budgets, and understand their financial activity through a simple dashboard.', 'Full Stack', '2026', 'Full Stack Developer', 'Completed', true, 'https://github.com/Manikandan-Prabhu/finova', 'https://finova.demo.app', 2),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'E-Commerce Platform', 'e-commerce', '03', 'Online Shopping Platform', 'An e-commerce web application designed to provide a simple online shopping experience with product browsing, product details, cart management, and order workflows.', 'Full Stack', '2026', 'Full Stack Developer', 'Completed', true, 'https://github.com/Manikandan-Prabhu/e-commerce-platform', 'https://ecommerce.demo.app', 3)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  one_liner = EXCLUDED.one_liner,
  short_description = EXCLUDED.short_description,
  category = EXCLUDED.category,
  role = EXCLUDED.role,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured,
  github_url = EXCLUDED.github_url,
  live_url = EXCLUDED.live_url;

-- SEED ARTICLES (UPSERT ON CONFLICT ID & SLUG)
INSERT INTO public.articles (id, title, slug, excerpt, content, category, status, published_at, reading_time)
VALUES
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'Building My First Spring Boot REST API', 'building-my-first-spring-boot-rest-api', 'A practical walkthrough on structuring Controllers, Services, and Repositories in a Java Spring Boot web application.', 'Building web APIs with Java and Spring Boot provides a structured way to handle HTTP requests and business logic.', 'Spring Boot', 'published', '2026-07-15', '5 min read'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Understanding Angular Components & Signals', 'understanding-angular-components-signals', 'Exploring how modern Angular standalone components and Signals make frontend state management cleaner and more reactive.', 'Angular 18 introduces Signals, making reactive state updates straightforward without heavy RxJS boilerplate.', 'Angular', 'published', '2026-06-28', '5 min read')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  reading_time = EXCLUDED.reading_time;
