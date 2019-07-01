import { CustomHttpInterceptor } from './shared/utils/custom-http-interceptor.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigLoaderService } from './shared/utils/config-loader.service';
import { AccountManagementComponent } from './account-management/account-management.component';
import { CustomTranslateLoader } from './shared/services/custom-translate-loader';
import { configLoaderFactory } from './shared/services/commen.loader';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { LoaderService } from './shared/services/spinner.service';
import { StorageService } from './shared/services/storage.service';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/');
}
export function createTranslateLoader(http: HttpClient) {
  return new CustomTranslateLoader(http, '/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    StorageService,
    LoaderService,
    ConfigLoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configLoaderFactory,
      deps: [ConfigLoaderService, TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
