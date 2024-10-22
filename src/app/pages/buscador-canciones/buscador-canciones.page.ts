import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { DbService } from '../../services/db.service';
import { UserService } from '../../services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-buscador-canciones',
  templateUrl: './buscador-canciones.page.html',
  styleUrls: ['./buscador-canciones.page.scss'],
})
export class BuscadorCancionesPage implements OnInit {
  songName: string = '';
  trackResults: any = [];
  playingTrack: any = null;
  userId: number | null = null;

  constructor(
    private spotifyService: SpotifyService,
    private dbService: DbService,
    private userService: UserService,
    private alertController: AlertController
  ) {}

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

    // Obtener el ID del usuario logueado desde el UserService
    this.userService.getUserIdFromStorage().then((id) => {
      this.userId = id;
      console.log('User ID obtenido en ngOnInit:', this.userId); // Verificar si se obtiene el userId
    }).catch((error) => {
      console.error('Error al obtener el User ID:', error);
    });
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

  // Añadir una canción a la lista de favoritos del usuario
  addToFavorites(track: any) {
    console.log('addToFavorites llamado para track:', track.name); // Verificar que se llama la función

    if (this.userId) { // Verificar que el userId no sea null
      console.log('User ID encontrado:', this.userId); // Confirmar el ID del usuario antes de añadir favorito
      this.dbService.addFavorite(
        this.userId,
        track.name,
        track.artists[0]?.name,
        track.album.name,
        track.id
      ).then(async () => {
        const alert = await this.alertController.create({
          header: 'Añadido a Favoritos',
          message: `La canción "${track.name}" ha sido añadida a tus favoritos.`,
          buttons: ['OK'],
        });
        await alert.present();
      }).catch((error) => {
        console.error('Error al añadir a favoritos:', error);
      });
    } else {
      console.error('No se pudo añadir a favoritos: el userId es null.');
      this.presentAlert('Error', 'No se ha podido añadir la canción a favoritos porque el usuario no está logueado.');
    }
  }

  // Función auxiliar para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
