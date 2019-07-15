import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';
import { config } from 'src/config/pages-config';
import { AccountManagementService } from '../account-management.service';
import { STROGE_TYPE } from 'src/app/shared/constants/defines';
import { globalCacheBusterNotifier } from 'ngx-cacheable';
@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent implements OnInit {
  userProfile: any;

  constructor(private storage: StorageService, private route: Router, private accountManagementService: AccountManagementService) { }
  ngOnInit() {
    this.getUserProfileData();
  }
  // Remove user token from storage and routing to login page
  logOut() {
    this.storage.remove('token', STROGE_TYPE.localStrorage);
    this.route.navigate([config.authentication.route]);
    /** globally remove whole Cacheable decorators  */
    globalCacheBusterNotifier.next();
  }
  // get userProfile data from account management service
  getUserProfileData() {
    this.accountManagementService.getUserProfile().subscribe((res) => this.userProfile = res)
  }
  moreDetails(){
    this.route.navigate([config.accountManagement.accountDetails.route]);
  }

}
