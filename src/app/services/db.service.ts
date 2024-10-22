import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; // Para manejar el ID del usuario

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private dbInstance: SQLiteObject | null = null;
  private userId: number | null = null; // Variable para almacenar el userId

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private storage: Storage // Inyectar el Storage para obtener el userId
  ) {
    this.platform.ready().then(() => {
      this.createDatabase();
    });

    // Inicializar Storage
    this.initStorage();
  }

  // Inicializa el almacenamiento
  private async initStorage() {
    await this.storage.create();
    this.userId = await this.storage.get('userId'); // Obtener el userId del localStorage
  }

  // Crear la base de datos
  createDatabase(): Promise<void> {
    return this.sqlite.create({
      name: 'appdata.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.dbInstance = db;
      return this.createTables();
    }).catch(e => {
      console.error('Error al crear la base de datos', e);
      return Promise.reject(e);
    });
  }

  // Crear tablas de usuarios y favoritos
  createTables(): Promise<void> {
    if (this.dbInstance) {
      return this.dbInstance.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email VARCHAR(100) NOT NULL,
          password VARCHAR(100) NOT NULL,
          age INTEGER,
          phone VARCHAR(15)
        );
      `, []).then(() => {
        console.log('Tabla de usuarios creada');

        // Asegurarse de que dbInstance no sea null antes de usarlo
        if (this.dbInstance) {
          return this.dbInstance.executeSql(`
            CREATE TABLE IF NOT EXISTS favorites (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER,
              track_name VARCHAR(255),
              track_artist VARCHAR(255),
              track_album VARCHAR(255),
              track_id VARCHAR(100),
              FOREIGN KEY (user_id) REFERENCES users(id)
            );
          `, []).then(() => {
            console.log('Tabla de canciones favoritas creada');
            return Promise.resolve();
          }).catch(e => {
            console.error('Error al crear tabla de canciones favoritas', e);
            return Promise.reject(e);
          });
        } else {
          return Promise.reject('dbInstance es null al crear la tabla de favoritos.');
        }
      }).catch(e => {
        console.error('Error al crear la tabla de usuarios', e);
        return Promise.reject(e);
      });
    } else {
      return Promise.reject('dbInstance es null al crear tablas.');
    }
  }

  // Insertar un nuevo usuario en la tabla
  addUser(email: string, password: string, age: number, phone: string): Promise<any> {
    console.log('Datos antes de insertar el usuario:', { email, password, age, phone });
    if (this.dbInstance) {
      let sql = 'INSERT INTO users (email, password, age, phone) VALUES (?, ?, ?, ?)';
      return this.dbInstance.executeSql(sql, [email, password, age, phone]).then(() => {
        console.log('Usuario añadido');
        return Promise.resolve(true);
      }).catch(e => {
        console.error('Error al añadir usuario', e);
        return Promise.reject(e);
      });
    } else {
      return Promise.resolve(null);
    }
  }

  // Obtener todos los usuarios
  getUsers(): Promise<any[]> {
    if (this.dbInstance) {
      let sql = 'SELECT * FROM users';
      return this.dbInstance.executeSql(sql, []).then(res => {
        let users = [];
        for (let i = 0; i < res.rows.length; i++) {
          users.push(res.rows.item(i));
        }
        return users;
      }).catch(e => {
        console.error('Error al obtener usuarios', e);
        return Promise.reject(e);
      });
    } else {
      return Promise.resolve([]);
    }
  }

  // Insertar una canción favorita
  addFavorite(userId: number, trackName: string, trackArtist: string, trackAlbum: string, trackId: string): Promise<any> {
    console.log('Datos antes de insertar la canción favorita:', { userId, trackName, trackArtist, trackAlbum, trackId });
    if (this.dbInstance) {
      let sql = 'INSERT INTO favorites (user_id, track_name, track_artist, track_album, track_id) VALUES (?, ?, ?, ?, ?)';
      return this.dbInstance.executeSql(sql, [userId, trackName, trackArtist, trackAlbum, trackId]).then(() => {
        console.log('Canción favorita añadida');
        return Promise.resolve(true);
      }).catch(e => {
        console.error('Error al añadir la canción favorita', e);
        return Promise.reject(e);
      });
    } else {
      return Promise.resolve(null);
    }
  }

  // Obtener canciones favoritas de un usuario
  getFavoritesByUser(userId: number): Promise<any[]> {
    if (this.dbInstance) {
      let sql = 'SELECT * FROM favorites WHERE user_id = ?';
      return this.dbInstance.executeSql(sql, [userId]).then(res => {
        let favorites = [];
        for (let i = 0; i < res.rows.length; i++) {
          favorites.push(res.rows.item(i));
        }
        return favorites;
      }).catch(e => {
        console.error('Error al obtener las canciones favoritas', e);
        return Promise.reject(e);
      });
    } else {
      return Promise.resolve([]);
    }
  }

  // Eliminar una canción de favoritos
  deleteFavorite(trackId: number): Promise<any> {
    if (this.dbInstance) {
      let sql = 'DELETE FROM favorites WHERE id = ?';
      return this.dbInstance.executeSql(sql, [trackId]).then(() => {
        console.log('Canción eliminada de favoritos');
        return Promise.resolve(true);
      }).catch(e => {
        console.error('Error al eliminar la canción de favoritos', e);
        return Promise.reject(e);
      });
    } else {
      return Promise.resolve(null);
    }
  }

  // Actualizar un usuario
  updateUser(id: number, email: string, password: string, age: number, phone: string): Promise<any> {
    if (this.dbInstance) {
      let sql = 'UPDATE users SET email = ?, password = ?, age = ?, phone = ? WHERE id = ?';
      return this.dbInstance.executeSql(sql, [email, password, age, phone, id]).then(() => {
        console.log('Usuario actualizado');
        return Promise.resolve(true);
      }).catch(e => {
        console.error('Error al actualizar usuario', e);
        return Promise.reject(e);
      });
    } else {
      return Promise.resolve(null);
    }
  }

  // Eliminar un usuario
  deleteUser(id: number): Promise<any> {
    if (this.dbInstance) {
      let sql = 'DELETE FROM users WHERE id = ?';
      return this.dbInstance.executeSql(sql, [id]).then(() => {
        console.log('Usuario eliminado');
        return Promise.resolve(true);
      }).catch(e => {
        console.error('Error al eliminar usuario', e);
        return Promise.reject(e);
      });
    } else {
      return Promise.resolve(null);
    }
  }

  // Obtener el userId desde el almacenamiento
  getUserIdFromStorage(): Promise<number | null> {
    return this.storage.get('userId');
  }
}
