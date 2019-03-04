import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  get<T>(url: string, dataTableParameter?: any): Observable<any> {
    return this.http.get<T>(environment.api_url + url, dataTableParameter);
  }
}
