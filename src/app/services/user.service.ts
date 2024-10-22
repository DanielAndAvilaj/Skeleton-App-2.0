import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // Asegúrate de haber importado Storage correctamente

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = {};
  private users: any[] = []; // Almacenamiento temporal de usuarios

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializar el Storage
  async init() {
    await this.storage.create();
  }

  // Función para establecer los datos del usuario registrado
  setUserData(email: string, password: string, age: number, phone: string, id: number) {
    this.userData = { email, password, age, phone, id };
    this.users.push(this.userData); // Guardamos el usuario registrado en el array de usuarios
    this.storage.set('userId', id); // Guardar el ID del usuario en el LocalStorage
  }

  // Función para obtener los datos del usuario actual
  getUserData() {
    return this.userData;
  }

  // Obtener el userId desde LocalStorage
  async getUserIdFromStorage(): Promise<number | null> {
    const userId = await this.storage.get('userId');
    return userId ? userId : null;
  }

  // Función para validar si el usuario existe y las credenciales son correctas
  validateUser(email: string, password: string): boolean {
    const user = this.users.find(user => user.email === email && user.password === password);
    return !!user; // Retorna true si encuentra el usuario, de lo contrario false
  }

  // Obtener todos los usuarios (si es necesario para otros propósitos)
  getAllUsers() {
    return this.users;
  }

  // Función para limpiar los datos del usuario al hacer logout
  clearUserData() {
    this.userData = {}; // Limpiar los datos del usuario
    this.storage.remove('userId'); // Eliminar el userId del LocalStorage al cerrar sesión
  }

  // Función de logout
  logout() {
    this.clearUserData();
    console.log('Usuario ha cerrado sesión');
  }
}
