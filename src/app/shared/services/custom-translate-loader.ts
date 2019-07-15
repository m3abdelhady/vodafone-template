import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { API_URL, Languages } from '../constants/defines';
import { RoutesConfig } from '../constants/config.routes';

export class CustomTranslateLoader extends TranslateHttpLoader {
    private customHttp;
    constructor(http: HttpClient, prefix?: string, suffix?: string) {
        super(http, prefix, suffix);
        this.customHttp = http;
    }

    getTranslation(lang?: string) {
        // get current language from a local json file
        if (lang === Languages.defaultEn) {
            return this.customHttp.get(this.prefix + 'en' + this.suffix);
            // get current language from server
        } else if (lang === Languages.en) {
            return this.customHttp.get(RoutesConfig.content);
        } else if (lang === Languages.ar) {
            return this.customHttp.get(RoutesConfig.contentAr);
        } else if (lang === Languages.defaultAr) {
            return this.customHttp.get(this.prefix + 'ar' + this.suffix);
        }
    }
}
