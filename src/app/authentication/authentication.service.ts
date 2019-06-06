import { API_URL } from './../shared/constants/defines';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class AuthenticationService {
 
  constructor(private http: HttpClient) { }

  /**
     * authenticate the user
     * @param username
     * @param password
     */
    authenticate(username: string, password: string) {
      let headers = new HttpHeaders();
      let url = API_URL.login;
      headers = headers.append('Content-Type', 'application/json');
      const options = {
          headers: headers
      }; 
      const body = {
          "username": username,
          "password": password
      };
      return this.http.post(url, body, options).map((res: any) => {
          // map logic
      });
  }


}
