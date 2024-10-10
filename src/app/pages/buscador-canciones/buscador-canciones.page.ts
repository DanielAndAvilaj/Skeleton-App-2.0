import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-buscador-canciones',
  templateUrl: './buscador-canciones.page.html',
  styleUrls: ['./buscador-canciones.page.scss'],
})
export class BuscadorCancionesPage implements OnInit {
  songName: string = '';
  trackResults: any = [];
  playingTrack: any = null;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.spotifyService.authenticate().subscribe(
      (response) => {
        this.spotifyService.setAccessToken(response.access_token);
        console.log('Token de acceso de Spotify obtenido correctamente.');
      },
      (error) => {
        console.error('Error al obtener el token de acceso:', error);
      }
    );
  }

  searchSong() {
    if (!this.songName || this.songName.trim() === '') {
      console.error('El nombre de la canción está vacío.');
      return;
    }

    this.spotifyService.searchTrack(this.songName).subscribe(
      (response) => {
        this.trackResults = response.tracks.items;
        console.log('Resultados de la búsqueda:', this.trackResults);
      },
      (error) => {
        console.error('Error al buscar la canción:', error);
      }
    );
  }

  playPreview(track: any) {
    if (track.preview_url) {
      this.playingTrack = {
        name: track.name,
        artist: track.artists[0]?.name,
        albumImage: track.album.images[0]?.url,
        preview_url: track.preview_url
      };
    } else {
      console.error('No hay una vista previa disponible para esta canción.');
    }
  }

  stopPlaying() {
    this.playingTrack = null; // Vuelve a la lista de canciones
  }
}
