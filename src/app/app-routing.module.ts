import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { config } from 'src/config/pages-config';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: config.login.name,
  //   pathMatch: 'full'
  // }, 
  {
    path: config.authentication.name,
    loadChildren: config.authentication.loadChildren,
    //canActivate: [AuthenticationGuard]
  },
  {
    path: config.accountManagement.name,
    loadChildren: config.accountManagement.loadChildren,
    //canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
