import { Route } from "@angular/router";

export const SETTING_ROUTES: Route[] = [

    { path: '', redirectTo: 'subscription', pathMatch: 'full' },
    {
        path: 'subscription',
        loadComponent: () => import('./subscription/subscription.component').then(c => c.SubscriptionComponent)
    },
    {
        path: 'notofocation',
        loadComponent: () => import('./notification/notification.component').then(c => c.NotificationComponent)

    },
]