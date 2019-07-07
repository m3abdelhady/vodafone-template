import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';
import { config } from 'src/config/pages-config';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent {

  constructor(private storage: StorageService, private route: Router) { }
  // Remove user token from storage and routing to login page
  logOut() {
    this.storage.removeFromLocalStorage('token');
    this.route.navigate([config.authentication.route]);
  }

}
