import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
    path: 'order-received',
    loadChildren: () => import('./order-received/order-received.module').then( m => m.OrderReceivedPageModule)
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
    path: 'order-shipping',
    loadChildren: () => import('./order-shipping/order-shipping.module').then( m => m.OrderShippingPageModule)
  },
  {
    path: 'order-arrived',
    loadChildren: () => import('./order-arrived/order-arrived.module').then( m => m.OrderArrivedPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
