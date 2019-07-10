import { CustomHttpInterceptor } from './shared/utils/interceptors/custom-http-interceptor.service';
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
import { TaggingConfigService } from './shared/services/tagging-config.service';
import { TaggingHelperService } from './shared/services/tagging-helper.service';
import { VodafoneTextComponent } from './shared/components/vodafone-text/vodafone-text.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { LoaderInterceptor } from './shared/utils/interceptors/loader.interceptor.service';
import { HttpErrorInterceptor } from './shared/utils/interceptors/http-error.interceptor.service';
import { LoggerService } from './shared/utils/logger.service';




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
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    LoggerService,
    AuthenticationGuard,
    AuthenticationService,
    StorageService,
    LoaderService,
    ErrorHandlerService,
    ConfigLoaderService,
    TaggingConfigService,
    TaggingHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      deps: [ErrorHandlerService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
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
