import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/local-storage.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService, private router: Router, private snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var jwtToken = this.storageService.getLoggedInUser() ? this.storageService.getLoggedInUser().jwtToken : '';
        request = request.clone({
            setHeaders: {
                Authorization: jwtToken
            }
        });

        var response = next.handle(request);
   
        response.subscribe(
            _ => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.storageService.clear();
                        this.router.navigate(['/login']);
                    } else {
                        this.snackBar.open(err.error, '', { duration: 1500, panelClass: ['red-snackbar'] });
                    }
                }
            });

        return response;
    }
}