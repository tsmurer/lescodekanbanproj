import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Card } from '../models/card';

export class RequestHelper {

    constructor() {
    }
    // Request methods + mandatory header with bearer token

    post(url?: any, body?: any, http?: HttpClient): Observable<any> {
        const headers = this.getHeader()
        return http.post<any>(url, body, { headers })
    }

    get(url?: any, http?: HttpClient): Observable<any> {
        const headers = this.getHeader()
        return http.get<any>(url, { headers })

    }

    put(url?: any, card?: Card, http?: HttpClient): Observable<any> {
        const headers = this.getHeader()
        const body = { titulo: card.name, conteudo: card.description, lista: card.columnId, id: card.id}
        return http.put<any>(url, body, { headers})
    }

    delete(url?: any, http?: HttpClient): Observable<any> {
        const headers = this.getHeader();

        return http.delete<any>(url, { headers});

    }

    getHeader(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          })
    }
}
