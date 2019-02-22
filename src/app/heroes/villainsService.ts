import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Hero } from './hero';
import { Villain } from './villain';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class VillainsService {

    villainsUrl = 'api/villains';  // URL to web api
    private handleError: HandleError;
    
    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
            this.handleError = httpErrorHandler.createHandleError('MyService');
    }

    lastWords(): string {
        return "I'll be back!";
    }

    /** GET heroes from the server */
    getVillains(): Observable<Villain[]> {
        return this.http.get<Villain[]>(this.villainsUrl)
            .pipe(
                catchError(this.handleError('getVillains', []))
            );
    }
}
