import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { config } from '../../config/pages-config';


const routes: Routes = [
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            { path: '', redirectTo: config.authentication.login.name, pathMatch: 'full'},
            { path: config.authentication.login.name, component: LoginComponent },
            { path: config.authentication.forget.name, component: ForgetPasswordComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
