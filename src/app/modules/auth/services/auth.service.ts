import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment.api;

  constructor(private http: HttpClient) {}

  public sendCredentials(email: string, password: string): Observable<any> {
    //console.log('OK OK', email, password);
    const body = {
      email,
      password,
    };

    return this.http.post(`${this.URL}/auth/login`, body);
  }
}
