import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  userEmail: string = '';
  userPassword: string = '';
  userAge: number = 0;
  userPhone: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    // Obtener los datos del usuario del servicio al cargar la página de configuración
    const { email, password, age, phone } = this.userService.getUserData();
    this.userEmail = email;
    this.userPassword = password;
    this.userAge = age;
    this.userPhone = phone;
  }

  logout() {
    // Limpia los datos del usuario almacenados en el servicio
    this.userService.setUserData('', '', 0, '');

    // Redirige al usuario a la página de login y recarga el estado para limpiar los datos
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
