import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from './shared/services/spinner.service';
import { StorageService } from './shared/services/storage.service';
import { TaggingConfigService } from './shared/services/tagging-config.service';
import { AuthenticationService } from './authentication/authentication.service';
import { Router } from '@angular/router';
import { config } from 'src/config/pages-config';
import { LoggerService } from './shared/utils/logger.service';
import { Languages } from './shared/constants/defines';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showLoader: boolean;
  constructor(private loaderService: LoaderService, private storage: StorageService, private taggingConfigService: TaggingConfigService,
              private auth: AuthenticationService, private route: Router, private translate: TranslateService,
              private loggerService: LoggerService) { }
  title = 'vodafone-template';
  ngOnInit() {
    // controlling enabling and disabling the spinner observed in loaderService using BehaviorSubject object
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
    this.taggingConfigService.routeChange();
  }
  // switch between langauges
  switchLang(lang) {
    if (lang === Languages.ar) {
      this.translate.setDefaultLang(Languages.defaultAr);
      this.translate.use('ar');
    } else {
      this.translate.setDefaultLang(Languages.defaultEn);
      this.translate.use(Languages.en);
    }
  }
  back() {
      window.history.back();
  }
}
