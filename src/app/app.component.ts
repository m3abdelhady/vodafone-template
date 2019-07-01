import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from './shared/services/spinner.service';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showLoader: boolean;
  constructor(private loaderService: LoaderService, private storage: StorageService) { }
  title = 'vodafone-template';
  ngOnInit() {
    // controlling enabling and disabling the spinner observed in loaderService using BehaviorSubject object
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }
}
