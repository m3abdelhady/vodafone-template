import { TranslateService } from '@ngx-translate/core';
import { ConfigLoaderService } from '../utils/config-loader.service';
export function configLoaderFactory(config: ConfigLoaderService, translateService: TranslateService) {
    return () => {
        config.load();
        translateService.setDefaultLang('default');
        translateService.use('en').catch(() => {
            return translateService.use('default');
        });
    };
}
