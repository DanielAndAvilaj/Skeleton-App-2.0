import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginUsuario: string = '';
  loginContrasena: string = '';
  loginEdad: number = 0;
  loginTelefono: string = '';

  constructor(private router: Router, private userService: UserService) {}

  login() {
    // Guarda los datos del usuario en el servicio
    this.userService.setUserData(this.loginUsuario, this.loginContrasena, this.loginEdad, this.loginTelefono);
    // Navegar a la página de perfil
    this.router.navigate(['/inicio']);
  }
}
