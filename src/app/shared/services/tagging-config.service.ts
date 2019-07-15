import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { TaggingHelperService } from './tagging-helper.service';

@Injectable()
export class TaggingConfigService {
    constructor(private router: Router, private taggingHelperService: TaggingHelperService) { }
    routeChange() {
        this.router.events.forEach((event: NavigationEvent) => {
            if (event instanceof NavigationEnd) {
                if (event.url) {
                    this.taggingHelperService.sendView(event.url);
                    this.taggingHelperService.track('data', event.url);
                }
            }
        });
    }
}
