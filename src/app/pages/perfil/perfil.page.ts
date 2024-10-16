import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  userEmail: string = '';
  userPassword: string = '';
  userAge: number = 0;
  userPhone: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ionViewWillEnter() {
    // Obtener los datos del usuario y mostrarlos en el perfil
    const userData = this.userService.getUserData();
    this.userEmail = userData.email;
    this.userPassword = userData.password;
    this.userAge = userData.age;
    this.userPhone = userData.phone;
  }

  goToConfig() {
    this.router.navigate(['/configuracion']);
  }
}
