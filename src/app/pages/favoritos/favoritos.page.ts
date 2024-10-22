import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  favoriteTracks: any[] = []; // Lista para almacenar las canciones favoritas del usuario
  userId: number | null = null; // Almacenar el ID del usuario logueado

  constructor(
    private dbService: DbService, // Inyectamos el servicio de la base de datos
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadFavorites(); // Cargar las canciones favoritas cuando la página se inicializa
  }

  // Función para cargar las canciones favoritas del usuario
  async loadFavorites() {
    // Obtener el ID del usuario actual desde localStorage
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId) : null;

    if (this.userId) {
      this.dbService.getFavoritesByUser(this.userId).then(favorites => {
        this.favoriteTracks = favorites; // Guardar los favoritos obtenidos
        console.log('Canciones favoritas del usuario:', this.favoriteTracks);
      }).catch(e => {
        console.error('Error al obtener las canciones favoritas', e);
        this.presentAlert('Error', 'No se pudo cargar las canciones favoritas');
      });
    } else {
      this.presentAlert('Error', 'No se pudo obtener el ID del usuario');
    }
  }

  // Función opcional para eliminar una canción de favoritos
  async removeFromFavorites(trackId: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar Favorito',
      message: '¿Estás seguro de que deseas eliminar esta canción de tus favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.dbService.deleteFavorite(trackId).then(() => {
              this.loadFavorites(); // Recargar la lista de favoritos después de eliminar
              this.presentAlert('Eliminado', 'La canción ha sido eliminada de tus favoritos.');
            }).catch(e => {
              console.error('Error al eliminar la canción de favoritos', e);
            });
          },
        },
      ],
    });

    await alert.present();
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
