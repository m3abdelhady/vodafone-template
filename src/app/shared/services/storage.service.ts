import { Injectable } from '@angular/core';
import { STROGE_TYPE, STORAGE_PREFIX } from '../constants/defines';

@Injectable()
export class StorageService {
    serviceStorage: object;

    constructor() {
        this.serviceStorage = new Object();
    }

    /**
     * add/set item to browser localstorage or the session storage
     * @param key the identifier for the localstorage item
     * @param value the value of localstorage item
     */
    public setSessionStorage(key: string, value: any) {
        const newKey = STORAGE_PREFIX + '.' + key;
        // Add to localstorage
        if (typeof value === 'object') {
            this.serviceStorage[newKey] = JSON.stringify(value);
        } else {
            this.serviceStorage[newKey] = String(value);
        }

    }

    public setLocalStorage(key: string, value: any) {
        const newKey = STORAGE_PREFIX + '.' + key;
        if (typeof value === 'object') {
            localStorage.setItem(newKey, JSON.stringify(value));
        } else {
            localStorage.setItem(newKey, String(value));
        }

    }

    /**
     * read certain item from the session storage or from the cachedSession and
     * parse the item to json if the item is a stringified object.
     * @param key The key of the property to be detected
     * @returns Object the returned object holds the value for the detected property
     */
    public getSessionStorage(key: string) {
        try {
            const value = JSON.parse(this.serviceStorage[STORAGE_PREFIX + '.' + key]);
            return value;
        } catch (error) {
            return this.serviceStorage[STORAGE_PREFIX + '.' + key];
        }
    }
    public getLocalStorage(key: string) {
        try {
            const value = JSON.parse(localStorage.getItem(STORAGE_PREFIX + '.' + key));
            return value;
        } catch (error) {
            return localStorage.getItem(STORAGE_PREFIX + '.' + key);
        }
    }

    /**
     * remove certain item from the localStorage and from the cachedSession
     * @param key The key of the property to be removed
     */
    // public remove(key: string) {
    //     delete this.serviceStorage[STORAGE_PREFIX + '.' + key];
    // }
    public removeFromLocalStorage(key: string) {
        localStorage.removeItem(STORAGE_PREFIX + '.' + key);
    }
    /** get from storage bassed on type */
    public setStorage(key: string, value: any, type: string) {
        const newKey = STORAGE_PREFIX + '.' + key;
        // Add to localstorage
        if (typeof value === 'object') {
            type === STROGE_TYPE.localStrorage ? localStorage.setItem(newKey, JSON.stringify(value)) :
                this.serviceStorage[newKey] = JSON.stringify(value);
        } else {
            type === STROGE_TYPE.localStrorage ? localStorage.setItem(newKey, String(value)) : this.serviceStorage[newKey] = String(value);
        }

    }
    /** get from session storage or local storage based on type */
    public getStorage(key, type) {
        try {
            const value = type === STROGE_TYPE.localStrorage ? JSON.parse(localStorage.getItem(STORAGE_PREFIX + '.' + key)) :
                JSON.parse(this.serviceStorage[STORAGE_PREFIX + '.' + key]);
            return value;
        } catch (error) {
            return type === STROGE_TYPE.localStrorage ?
            localStorage.getItem(STORAGE_PREFIX + '.' + key) : localStorage.getItem(STORAGE_PREFIX + '.' + key);
        }
    }
    /** remove from storage */
    public remove(key: string, type: string) {
        type === STROGE_TYPE.localStrorage ? 
        localStorage.removeItem(STORAGE_PREFIX + '.' + key) : delete this.serviceStorage[STORAGE_PREFIX + '.' + key];
    }

}
