import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginEmail: string = '';
  loginPassword: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    // Validar el usuario a través del servicio
    const isValidUser = this.userService.validateUser(this.loginEmail, this.loginPassword);

    if (isValidUser) {
      // Redirigir al perfil si las credenciales son correctas
      this.router.navigate(['/inicio']);
    } else {
      // Mostrar mensaje de error si las credenciales son incorrectas
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']); // Navegar al registro
  }
}
