import { Observable} from 'rxjs/Observable';
import  'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';





@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    // using pure functions to create pipeline request
    requestInterceptors: ((req: HttpRequest<any>) => HttpRequest<any>)[] = [];
    // using pure functions to create pipeline response
    responseInterceptors: ((req: HttpResponse<any>) => HttpResponse<any>)[] = [];


    constructor( ) {

        const that = this;
        setTimeout(function () {
            that.responseInterceptors.push(res => {
                return res;
            });
        });

        this.requestInterceptors.push(req => {
            let newReq = req;
            return newReq;
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       

        // const newHeader = this.generateAuthHeader(req); 
        // const headers = new HttpHeaders(newHeader);

        // req = req.clone({ headers });

        const newReq = this.requestInterceptors.reduce((r, fn) => fn(r), req);

        return next.handle(newReq || req).do(event => {
            if (event instanceof HttpResponse) {
            }
        }).catch((error, event) => {
            return throwError(error);
        });

    }

    /**This function used to generate new header from request header and remove skip loader header as well as authentication add
     * @param req : request of http call
     * @returns : new header with authenication add and remove skip loader loacally header param
     */

}
