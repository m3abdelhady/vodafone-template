import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { config } from 'src/config/pages-config';
import { AuthenticationGuard } from './shared/guards/authentication.guard';

const routes: Routes = [
  {
    path: config.authentication.name,
    loadChildren: config.authentication.loadChildren,
  },
  {
    path: config.accountManagement.name,
    loadChildren: config.accountManagement.loadChildren,
    canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
