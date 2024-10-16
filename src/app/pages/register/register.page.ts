import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerEmail: string = '';
  registerPassword: string = '';
  registerAge: number = 0;
  registerPhone: string = '';

  emailError: boolean = false;
  passwordError: boolean = false;
  ageError: boolean = false;
  phoneError: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  // Validación del correo
  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailRegex.test(this.registerEmail);
  }

  // Validación de la contraseña (mínimo 1 mayúscula, 1 número, y 8 caracteres)
  validatePassword() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    this.passwordError = !passwordRegex.test(this.registerPassword);
  }

  // Validación de la edad (debe estar entre 10 y 100)
  validateAge() {
    this.ageError = this.registerAge < 10 || this.registerAge > 100;
  }

  // Validación del teléfono (formato +569 seguido de 8 dígitos)
  validatePhone() {
    const phoneRegex = /^\+569\d{8}$/;
    this.phoneError = !phoneRegex.test(this.registerPhone);
  }

  // Registro de usuario
  register() {
    // Ejecutamos las validaciones
    this.validateEmail();
    this.validatePassword();
    this.validateAge();
    this.validatePhone();

    if (!this.emailError && !this.passwordError && !this.ageError && !this.phoneError) {
      // Si las validaciones son correctas, guardamos los datos del usuario
      this.userService.setUserData(this.registerEmail, this.registerPassword, this.registerAge, this.registerPhone);
      console.log('Usuario registrado correctamente');

      // Redirigir a la página de inicio
      this.router.navigate(['/inicio']);
    } else {
      console.log('Errores en el formulario de registro');
    }
  }
}
