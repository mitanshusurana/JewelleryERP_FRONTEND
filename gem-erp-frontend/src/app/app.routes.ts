import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      component: DashboardComponent // <-- THIS LINE FIXES THE ROUTING ERROR
    },
    {
        path: 'new-product',
        loadComponent: () => import('./features/product-creation/product-creation.component')
                           .then(m => m.ProductCreationComponent)
    },
];

