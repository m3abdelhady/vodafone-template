import { STORAGE_PREFIX, STROGE_TYPE } from './../constants/defines';
import {StorageService} from './storage.service';
import {Injectable} from '@angular/core';

@Injectable()
export class RoutesCachingService {

    /** object represents the cached Data */
    public cachedData = {};

    constructor (private storageService: StorageService) {
    }

    /**
     * add the new module to the cached data if no old data
     * if replace old data true add remove old and add new module
     * @param {string} moduleName
     * @param {any} data
     * @param {boolean} replaceOldData
     */
    public setCachedData (moduleName: string, data: any, replaceOldData: boolean = true) {
    if (this.cachedData[moduleName]) {
            if (replaceOldData) {
                this.cachedData[moduleName] = data;
                this.storageService.setSessionStorage(STORAGE_PREFIX + moduleName, data);
            }
        } else {
            this.cachedData[moduleName] = data;
            this.storageService.setSessionStorage(STORAGE_PREFIX + moduleName, data);
        }
    }

    /**
     * get the module from the cached data if exist else get from the session storage
     * @param {string} moduleName
     */
    public getCachedData (moduleName: string): any {
        if (this.cachedData[moduleName]) {
            return this.cachedData[moduleName];
        } else {
            return this.storageService.getSessionStorage(STORAGE_PREFIX + moduleName);
        }
    }

    /**
     * check if already have the module to the cachedData then remove it
     * add the new module to the cached data
     * if add To session true add it to the session storage
     * @param {string} moduleName
     */
    public removeCachedData (moduleName: string) {
        if (this.cachedData[moduleName]) {
            delete this.cachedData[moduleName];
        }
        this.storageService.remove(STORAGE_PREFIX + moduleName, STROGE_TYPE.sessionStorage);
    }

}
