import { Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login-form/login-form').then(l => l.LoginForm)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/rigration-form/rigration-form').then(r => r.RigrationForm)
    },
    {
        path: 'contact',
        loadComponent: () => import('./components/contact/contact').then(c => c.Contact)
    },
    {
        path: 'work',
        loadComponent: () => import('./components/work/work').then(w => w.Work)
    },
    {
        path: 'blog',
        loadComponent: () => import('./components/blog/blog').then(b => b.Blog)
    },
     {
        path: '**',
        redirectTo: 'home'
     }
];
