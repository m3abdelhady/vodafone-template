import { API_URL } from './../shared/constants/defines';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StorageService } from '../shared/services/storage.service';


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
            this.storage.setLocalStorage('token', res.access_token)
            console.log(res.access_token);
            return res;
        }));
    }
    public isAuthenticated(): boolean {
        // Check whether the token is exist or not
        const token = this.storage.getLocalStorage('token');
        return token;
    }


}
