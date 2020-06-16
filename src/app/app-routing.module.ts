import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'history-main',
    loadChildren: () => import('./history-main/history-main.module').then( m => m.HistoryMainPageModule)
  },
  {
    path: 'history-detail',
    loadChildren: () => import('./history-detail/history-detail.module').then( m => m.HistoryDetailPageModule)
  },
  {
    path: 'order-cancel',
    loadChildren: () => import('./order-cancel/order-cancel.module').then( m => m.OrderCancelPageModule)
  },
  {
    path: 'order-customer-contact',
    loadChildren: () => import('./order-customer-contact/order-customer-contact.module').then( m => m.OrderCustomerContactPageModule)
  },
  {
    path: 'profile-main',
    loadChildren: () => import('./profile-main/profile-main.module').then( m => m.ProfileMainPageModule)
  },
  {
    path: 'order-cancel-pending',
    loadChildren: () => import('./order-cancel-pending/order-cancel-pending.module').then( m => m.OrderCancelPendingPageModule)
  },
  {
    path: 'order-stage',
    loadChildren: () => import('./order-stage/order-stage.module').then( m => m.OrderStagePageModule)
  },
  {
    path: 'order-restaurant-contact',
    loadChildren: () => import('./order-restaurant-contact/order-restaurant-contact.module').then( m => m.OrderRestaurantContactPageModule)
  },
  {
    path: 'order-admin-contact',
    loadChildren: () => import('./order-admin-contact/order-admin-contact.module').then( m => m.OrderAdminContactPageModule)
  },
  {
    path: 'order-customer-contact',
    loadChildren: () => import('./order-customer-contact/order-customer-contact.module').then( m => m.OrderCustomerContactPageModule)
  },
  {
    path: 'profile-main',
    loadChildren: () => import('./profile-main/profile-main.module').then( m => m.ProfileMainPageModule)
  },
  {
    path: 'order-cancel-pending',
    loadChildren: () => import('./order-cancel-pending/order-cancel-pending.module').then( m => m.OrderCancelPendingPageModule)
  },
  {
    path: 'order-stage',
    loadChildren: () => import('./order-stage/order-stage.module').then( m => m.OrderStagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
