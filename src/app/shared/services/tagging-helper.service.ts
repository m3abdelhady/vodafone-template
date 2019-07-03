import { Injectable } from '@angular/core';

@Injectable()
export class TaggingHelperService {
    sendView(pageView) {
        return { pageName: pageView };
    }
    track(data, navegation) {

    }
}
