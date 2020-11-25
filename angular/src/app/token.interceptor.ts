import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

const AUTH_HEADER = "Authorization";
const TOKEN = localStorage.getItem('token');

if (!req.headers.has('Content-Type')) {
  req = req.clone({
    headers: req.headers.set('Content-Type', 'application/json')
  });
}

if (TOKEN) {
  req = req.clone({
    headers: req.headers.set(AUTH_HEADER,"Bearer " +  TOKEN)
  });
}

return next.handle(req).pipe(
  map((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      console.log('event--->>>', event);
    }
    return event;
  }));
}
}
