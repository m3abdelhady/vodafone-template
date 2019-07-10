import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { API_URL } from '../constants/defines';
import { RoutesConfig } from '../constants/config.routes';

export class CustomTranslateLoader extends TranslateHttpLoader {
    private customHttp;
    constructor(http: HttpClient, prefix?: string, suffix?: string) {
        super(http, prefix, suffix);
        this.customHttp = http;
    }

    getTranslation(lang?: string) {
        // get current language from a local json file
        if (lang === 'default') {
            return this.customHttp.get(this.prefix + 'en' + this.suffix);
            // get current language from server
        } else if (lang === 'en') {
            return this.customHttp.get(RoutesConfig.content);
        } else if (lang === 'ar') {
            return this.customHttp.get(RoutesConfig.contentAr);
        } else if (lang === 'defaultAr') {
            return this.customHttp.get(this.prefix + 'ar' + this.suffix);
        }
    }
}
