import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Hero } from './hero';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class MyService {

    heroesUrl = 'api/heroes';  // URL to web api
    private handleError: HandleError;
    
    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
            this.handleError = httpErrorHandler.createHandleError('MyService');
    }

    sayHello(name: string): string {
        return `Hello, ${name}`;
    }

    /** GET heroes from the server */
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                catchError(this.handleError('getHeroes', []))
            );
    }
}
