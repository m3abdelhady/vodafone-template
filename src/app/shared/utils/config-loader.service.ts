import { Injectable, Injector } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { config } from '../../../config/pages-config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';
import { RoutesConfig } from '../constants/config.routes';
@Injectable()
export class ConfigLoaderService {

  public errors: any;

  public commonErrors: any;
  public constructor(private injector: Injector) { }
  /**
   * load regex configuration file
   */
  public load(): Promise<any> {

    const errorsConfig = new Promise((resolve, reject) => {
      setTimeout(() => {
        const http = this.injector.get(HttpClient);
        http.get(environment.configPath + 'error-messages.json').subscribe(response => {
          this.errors = response;
          resolve(this.errors);
        }, (err) => {
          resolve(null);
        });
      });
    });
    const arabicLanguage = new Promise((resolve, reject) => {
      setTimeout(() => {
        const http = this.injector.get(HttpClient);
        http.get(RoutesConfig.contentAr).subscribe(response => {
          resolve(this.errors);
        }, (err) => {
          resolve(null);
        });
      });
    });



    // return Promise.resolve(regexConfig);
    return Promise.all([errorsConfig, arabicLanguage]);
  }

  public loadPagesRoutes: () => object | object[] = () => {
    return config;
  }

  public getErrorsConfig() {
    return this.errors;
  }

}
