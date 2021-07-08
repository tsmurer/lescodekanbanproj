import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = environment.apiURL + '/login/'
  constructor(
    private http: HttpClient
  ) { }


  authenticate() {
    return this.http.post<any>(this.authUrl, { "login": environment.defaultLogin, "senha":environment.defaultPassword })
  }

}
