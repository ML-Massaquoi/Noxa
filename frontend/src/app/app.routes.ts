import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'welcome', 
    pathMatch: 'full' 
  },
  { 
    path: 'welcome', 
    loadComponent: () => import('./components/pages/welcome/welcome').then(m => m.WelcomeComponent) 
  },
  { 
    path: 'menu', 
    loadComponent: () => import('./components/pages/menu/menu').then(m => m.MenuComponent)
  },
  { 
    path: 'checkout', 
    loadComponent: () => import('./components/pages/checkout/checkout').then(m => m.CheckoutComponent)
  },
  { 
    path: 'confirmation', 
    loadComponent: () => import('./components/pages/confirmation/confirmation').then(m => m.ConfirmationComponent)
  },
  { 
    path: 'admin-login', 
    loadComponent: () => import('./components/pages/admin-login/admin-login').then(m => m.AdminLoginComponent)
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./components/pages/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  { 
    path: '**', 
    redirectTo: 'welcome' 
  }
];