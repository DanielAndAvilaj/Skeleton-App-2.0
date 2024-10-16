import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage {
  userEmail: string = '';
  userPassword: string = '';
  userAge: number = 0;
  userPhone: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ionViewWillEnter() {
    // Obtener los datos del usuario y mostrarlos en la configuración
    const userData = this.userService.getUserData();
    this.userEmail = userData.email;
    this.userPassword = userData.password;
    this.userAge = userData.age;
    this.userPhone = userData.phone;
  }

  logout() {
    // Limpiar los datos del usuario al cerrar sesión
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
