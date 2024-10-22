import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId = '9d497271a3c64ff8abc0ced54afb129c'; // Reemplaza con tu Client ID de Spotify
  private clientSecret = 'e77fc63b73a54308870bdc7e2dd9918b'; // Reemplaza con tu Client Secret de Spotify
  private authUrl = 'https://accounts.spotify.com/api/token';
  private apiUrl = 'https://api.spotify.com/v1';
  private accessToken: string = '';

  constructor(private http: HttpClient) { }

  // Autenticación con Spotify API
  authenticate(): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });

    return this.http.post(this.authUrl, body.toString(), { headers });
  }

  // Establecer el token de acceso para hacer solicitudes autenticadas
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  // Búsqueda de canciones en Spotify por nombre
  searchTrack(track: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.get(`${this.apiUrl}/search?q=${track}&type=track`, { headers });
  }

  // Obtener detalles de una canción por su ID
  getTrackById(trackId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.get(`${this.apiUrl}/tracks/${trackId}`, { headers });
  }

  // Método para agregar una canción a la base de datos de favoritos
  addTrackToFavorites(userId: number, track: any): Observable<any> {
    // Aquí devolveremos los detalles necesarios de la canción para agregarlos como favoritos
    const trackData = {
      userId: userId,
      trackName: track.name,
      trackArtist: track.artists[0]?.name || 'Unknown Artist',
      trackAlbum: track.album?.name || 'Unknown Album',
      trackId: track.id
    };

    // Este es solo un ejemplo, aquí deberías integrar con tu DbService o servicio que maneja la base de datos.
    console.log('Añadir a favoritos:', trackData);
    return new Observable(observer => {
      observer.next(trackData);
      observer.complete();
    });
  }
}
