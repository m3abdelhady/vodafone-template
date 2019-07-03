import { Injectable } from '@angular/core';

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
        const newKey = 'app' + '.' + key;
        // Add to localstorage
        if (typeof value === 'object') {
            this.serviceStorage[newKey] = JSON.stringify(value);
        } else {
            this.serviceStorage[newKey] = String(value);
        }

    }

    public setLocalStorage(key: string, value: any) {
        const newKey = 'app' + '.' + key;
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
            const value = JSON.parse(this.serviceStorage['app' + '.' + key]);
            return value;
        } catch (error) {
            return this.serviceStorage['app' + '.' + key];
        }
    }

    public getLocalStorage(key: string) {
        try {
            const value = JSON.parse(localStorage.getItem('app' + '.' + key));
            return value;
        } catch (error) {
            return localStorage.getItem('app' + '.' + key);
        }
    }

    /**
     * remove certain item from the localStorage and from the cachedSession
     * @param key The key of the property to be removed
     */
    public remove(key: string) {
        delete this.serviceStorage['app' + '.' + key];
    }
    public removeFromLocalStorage(key: string) {
        localStorage.removeItem('app' + '.' + key);
    }

}
