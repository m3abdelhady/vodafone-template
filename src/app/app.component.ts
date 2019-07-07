import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from './shared/services/spinner.service';
import { StorageService } from './shared/services/storage.service';
import { TaggingConfigService } from './shared/services/tagging-config.service';
import { AuthenticationService } from './authentication/authentication.service';
import { Router } from '@angular/router';
import { config } from 'src/config/pages-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showLoader: boolean;
  constructor(private loaderService: LoaderService, private storage: StorageService, private taggingConfigService: TaggingConfigService,
              private auth: AuthenticationService, private route: Router) { }
  title = 'vodafone-template';
  ngOnInit() {
    // controlling enabling and disabling the spinner observed in loaderService using BehaviorSubject object
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
    this.taggingConfigService.routeChange();
    this.userAuthenticate();
  }
  /**  check If the user is authenticated to access app or routing to login page */
  userAuthenticate() {
    if (this.auth.isAuthenticated()) {
      this.route.navigate([config.accountManagement.route]);
    } else {
      this.route.navigate([config.authentication.route]);
    }
  }
}
