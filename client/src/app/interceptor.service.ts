import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private commonService: CommonService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.commonService.getToken();
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append("authorization", token);
    }
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) return event;
        },
        (err) => {
          if (err.status == 401) this.router.navigate(["/auth"]);
        }
      )
    );
  }
}
