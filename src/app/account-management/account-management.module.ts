import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { AccountManagementRoutingModule } from './account-management-routing.module';
import { AccountManagementComponent } from './account-management.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AccountManagementService } from './account-management.service';
import { AccountDetailsComponent } from './account-details/account-details.component';

@NgModule({
  imports: [
    SharedModule,
    AccountManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [AccountManagementComponent, AccountOverviewComponent, AccountDetailsComponent],
  providers: [AccountManagementService]
})
export class AccountManagementModule {
}
