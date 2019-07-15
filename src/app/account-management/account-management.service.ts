import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../shared/constants/defines';
import { map } from 'rxjs/operators';
import { Cacheable } from 'ngx-cacheable';



@Injectable()
export class AccountManagementService {
  constructor(private http: HttpClient) { }
  /**
   * Observable cache decorator use to decorate function methods which return streams and cache their return values
   * maxAge of cache in milliseconds
   * @description max time to cache values after calling api
   */
  @Cacheable({
    maxAge: 30000
  })
  getUserProfile() {
    const url = API_URL.userProflie;
    return this.http.get(url).pipe(map((res) => {
      return res;
    }))
  }

}
