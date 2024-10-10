import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId = '9d497271a3c64ff8abc0ced54afb129c'; // Reemplaza con tu Client ID de Spotify
  private clientSecret = 'e77fc63b73a54308870bdc7e2dd9918b'; // Reemplaza con tu Client Secret de Spotify
  private redirectUri = 'http://localhost:8100/callback'; // Redirección configurada en Spotify
  private authUrl = 'https://accounts.spotify.com/api/token';
  private apiUrl = 'https://api.spotify.com/v1';
  private accessToken: string = '';

  constructor(private http: HttpClient) { }

  authenticate(): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });

    return this.http.post(this.authUrl, body.toString(), { headers });
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  searchTrack(track: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.get(`${this.apiUrl}/search?q=${track}&type=track`, { headers });
  }
}
