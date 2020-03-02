import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base/base.service';
import { RedirectService } from 'src/app/services/redirect/redirect.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  token: string;

  constructor(private baseService: BaseService, private redirectService: RedirectService) { 
    this.token = this.baseService.getToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
    'Authorization': `${this.token}`,
    'Content-Type': 'application/json'
    });

    const reqclone = req.clone({
      headers
    });

    return next.handle(reqclone).pipe(   
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if(err.status === 0)
          this.redirectService.login();
        }
      })

    );

  }

}
