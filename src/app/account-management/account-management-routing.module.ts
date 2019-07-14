import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { AccountManagementComponent } from './account-management.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { config } from '../../config/pages-config';
import { AccountDetailsComponent } from './account-details/account-details.component';


const routes: Routes = [
    {
        path: '',
        component: AccountManagementComponent,
        children: [
            { path: '', redirectTo: config.accountManagement.accountOverview.name, pathMatch: 'full' },
            { path: config.accountManagement.accountOverview.name, component: AccountOverviewComponent },
            { path: config.accountManagement.accountDetails.name, component: AccountDetailsComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountManagementRoutingModule { }
