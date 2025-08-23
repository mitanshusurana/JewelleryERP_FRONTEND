import { Routes } from '@angular/router';

export const routes: Routes = [
    // Default route redirects to the dashboard
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    // Lazy-load the product creation feature when the user navigates to '/new-product'
    {
        path: 'new-product',
        loadComponent: () => import('./features/product-creation/product-creation.component')
                           .then(m => m.ProductCreationComponent)
    },
    // TODO: Add a dashboard component
    // { path: 'dashboard', component: DashboardComponent }
];
