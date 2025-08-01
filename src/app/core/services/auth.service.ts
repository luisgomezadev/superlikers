import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Participant {
  name: string;
  email: string;
  uid: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private participanteKey = 'participante';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = {
      api_key: environment.apiKey,
      campaign: environment.campaign,
      participation: {
        'codigo-de-cliente': username,
        password: password,
      },
    };
    return this.http.post<any>('/api/microsite/sessions/login', body).pipe(
      tap((response) => {
        const participant: Participant = {
          name: response.participant.name,
          email: response.participant.email,
          uid: response.participant.uid
        }
        this.setToken(response.token);
        this.setParticipant(participant);
      })
    );
  }

  register(email: string, genero: string, nombreCompleto: string, codigoCliente: string): Observable<any> {
    const body = {
      api_key: '32e608447ff50d5b6760c335ffe87262',
      campaign: '4u',
      properties: {
        email: email,
        genero: genero,
        'nombre-completo': nombreCompleto,
        'codigo-de-cliente': codigoCliente
      }
    };
    return this.http.post('/api/participants', body)
  }

  logout(): Observable<any> {
    return this.http.post<any>('/api/microsite/sessions/logout', {}).pipe(
      tap(() => {
        this.clearToken();
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getParticipant() {
    const raw = localStorage.getItem(this.participanteKey);
    return raw ? JSON.parse(raw) : null;
  }

  private setParticipant(participant: Participant): void {
    localStorage.setItem(this.participanteKey, JSON.stringify(participant));
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
