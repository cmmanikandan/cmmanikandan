import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { WorkListComponent } from './features/work/work-list.component';
import { CaseStudyComponent } from './features/work/case-study.component';
import { EngineeringComponent } from './features/engineering/engineering.component';
import { AboutComponent } from './features/about/about.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { WritingListComponent } from './features/writing/writing-list.component';
import { ArticleDetailComponent } from './features/writing/article-detail.component';
import { ContactComponent } from './features/contact/contact.component';
import { ResumeComponent } from './features/resume/resume.component';
import { UsesComponent } from './features/uses/uses.component';
import { NowComponent } from './features/now/now.component';
import { AdminLoginComponent } from './features/admin/login.component';
import { AdminDashboardComponent } from './features/admin/dashboard.component';
import { ProjectCmsComponent } from './features/admin/project-cms.component';
import { ArticleCmsComponent } from './features/admin/article-cms.component';
import { MessageInboxComponent } from './features/admin/message-inbox.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'work', component: WorkListComponent },
  { path: 'work/:slug', component: CaseStudyComponent },
  { path: 'engineering', component: EngineeringComponent },
  { path: 'about', component: AboutComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'writing', component: WritingListComponent },
  { path: 'writing/:slug', component: ArticleDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'uses', component: UsesComponent },
  { path: 'now', component: NowComponent },

  // Protected Admin Routes
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'admin/projects', component: ProjectCmsComponent, canActivate: [authGuard] },
  { path: 'admin/writing', component: ArticleCmsComponent, canActivate: [authGuard] },
  { path: 'admin/messages', component: MessageInboxComponent, canActivate: [authGuard] },

  // Fallback Route
  { path: '**', redirectTo: '' }
];
