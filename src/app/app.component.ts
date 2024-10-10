import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loginUsuario = 'usuario@example.com';
  loginContrasena = '123456';
  loginEdad = 25;
  loginTelefono = '123456789';

  constructor(private router: Router) {}

  goToProfile() {
    let navigationExtras: NavigationExtras = {
      state: {
        usuario: this.loginUsuario,
        contrasena: this.loginContrasena,
        edad: this.loginEdad,
        telefono: this.loginTelefono
      }
    };
    this.router.navigate(['/perfil'], navigationExtras);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  
}
