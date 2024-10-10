import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = {};

  setUserData(email: string, password: string, age: number, phone: string) {
    console.log('Datos de usuario guardados:', { email, password, age, phone });
    this.userData = { email, password, age, phone };
  }

  getUserData() {
    return this.userData;
  }
}
