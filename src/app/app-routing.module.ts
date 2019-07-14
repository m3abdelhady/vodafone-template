import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { config } from 'src/config/pages-config';
import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { ErrorTemplateComponent } from './shared/components/error-template/error-template.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { AccountManagementModule } from './account-management/account-management.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: config.accountManagement.name,
    pathMatch: 'full'
  },
  {
    path: config.authentication.name,
    loadChildren: () => AuthenticationModule,
  },
  {
    path: config.accountManagement.name,
  loadChildren: () => AccountManagementModule,
    canActivate: [AuthenticationGuard]
  },
  {
    path: config.generalError.name,
    component: ErrorTemplateComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
