import { Injectable } from '@angular/core';

@Injectable()
export class TaggingHelperService {
    // send pageName for tagging
    sendView(pageView) {
        return { pageName: pageView };
    }
    // send tagging track
    track(data, navegation) {

    }
}
