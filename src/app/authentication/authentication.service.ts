import { API_URL, STROGE_TYPE } from './../shared/constants/defines';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StorageService } from '../shared/services/storage.service';
import { throwError } from 'rxjs';


@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient, private storage: StorageService) { }

    /**
     * authenticate the user
     * @param username
     * @param password
     */
    authenticate(username: string, password: string) {
        let headers = new HttpHeaders();
        const url = API_URL.login;
        headers = headers.append('Content-Type', 'application/json');
        const options = {
            headers
        };
        const body = {
            username,
            password
        };
        return this.http.post(url, body, options).pipe(map((res: any) => {
            this.storage.setStorage('token', res.access_token, STROGE_TYPE.localStrorage);
            return res;
        }));
    }
    public isAuthenticated(): boolean {
        // Check whether the token is exist or not
        const token = this.storage.getLocalStorage('token');
        return token;
    }


}
