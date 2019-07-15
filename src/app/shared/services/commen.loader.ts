import { TranslateService } from '@ngx-translate/core';
import { ConfigLoaderService } from '../utils/config-loader.service';
import { Languages } from '../constants/defines';
/**
 * config Loader is a Factory that holds
 * @param config  Configuration Service which contains load function that load file error-message
 */
export function configLoaderFactory(config: ConfigLoaderService, translateService: TranslateService) {
    return () => {
        config.load();
        // set default as defaultLang will load a local json file as current language if the word didn't available in cms
        translateService.setDefaultLang(Languages.defaultEn);
        // use en will used external cms as a current language
        translateService.use(Languages.en);
    };
}
