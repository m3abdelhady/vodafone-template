import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { AccountManagementRoutingModule } from './account-management-routing.module';
import { AccountManagementComponent } from './account-management.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';


@NgModule({
  imports: [
    SharedModule,
    AccountManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ AccountManagementComponent, AccountOverviewComponent ],
  providers: [AccountManagementComponent]
})
export class AccountManagementModule { }
