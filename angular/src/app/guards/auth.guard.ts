import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }      

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.isLoggedIn()) {      
        return true;      
        }      
        // navigate to login page as user is not authenticated      
     this.router.navigate(['/login']);      
  return false;   }

  public isLoggedIn(): boolean {      
    
      if (localStorage.getItem('isLoggedIn') == "true") {      
        return true;      
      }    
      else {      
        return false;      
      }      
   
  }   
  
}
