import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'newroutine',
    loadChildren: () => import('./pages/newroutine/newroutine.module').then( m => m.NewroutinePageModule)
  },
  {
    path: 'edit-rutine',
    loadChildren: () => import('./pages/edit-rutine/edit-rutine.module').then( m => m.EditRutinePageModule)
  },
  {
    path: 'topfighterz',
    loadChildren: () => import('./pages/topfighterz/topfighterz.module').then( m => m.TopfighterzPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
