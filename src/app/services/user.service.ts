import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = {};
  private users: any[] = []; // Almacenamiento temporal de usuarios

  // Función para establecer los datos del usuario registrado
  setUserData(email: string, password: string, age: number, phone: string) {
    this.userData = { email, password, age, phone };
    this.users.push(this.userData); // Guardamos el usuario registrado en el array de usuarios
  }

  // Función para obtener los datos del usuario actual
  getUserData() {
    return this.userData;
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
  }

  // Función de logout
  logout() {
    this.clearUserData();
    console.log('Usuario ha cerrado sesión');
  }
}
