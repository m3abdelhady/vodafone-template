import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { MODULE_NAME } from '../../constants/defines';
import { RoutesConfig } from '../../constants/config.routes';
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(public errorHandler: ErrorHandlerService) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.url.toString().includes(RoutesConfig.content) && !request.url.toString().includes(RoutesConfig.contentAr)) {
            return next.handle(request)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        let errorMessage = '';
                        errorMessage = this.errorHandler.getErrorDescription(this.errorHandler.getModuleName(),
                            error.error.ecode, error.status);
                        return throwError(errorMessage);
                    })
                );
        }
    }
}
