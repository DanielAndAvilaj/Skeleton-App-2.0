import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service'; // Importamos el servicio de la base de datos

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerEmail: string = '';
  registerPassword: string = '';
  registerAge: number | null = null; // Aseguramos que la edad sea null si no es un número
  registerPhone: string = '';

  emailError: boolean = false;
  passwordError: boolean = false;
  ageError: boolean = false;
  phoneError: boolean = false;

  constructor(private router: Router, private dbService: DbService) {} // Inyectamos el servicio de base de datos

  // Validación del correo
  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailRegex.test(this.registerEmail);
  }

  // Validación de la contraseña
  validatePassword() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    this.passwordError = !passwordRegex.test(this.registerPassword);
  }

  // Validación de la edad
  validateAge() {
    this.ageError = this.registerAge === null || this.registerAge < 10 || this.registerAge > 100;
  }

  // Validación del teléfono
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
      // Verificar los datos que se enviarán
      console.log('Datos antes de insertar el usuario:', {
        email: this.registerEmail,
        password: this.registerPassword,
        age: this.registerAge,
        phone: this.registerPhone,
      });

      // Si no hay errores, proceder con el registro en la base de datos
      this.dbService.addUser(this.registerEmail, this.registerPassword, this.registerAge || 0, this.registerPhone) // Aseguramos que age no sea null
        .then(() => {
          console.log('Usuario registrado en la base de datos');
          this.router.navigate(['/inicio']); // Redirigir a la página de inicio
        })
        .catch(e => {
          console.log('Error al registrar el usuario en la base de datos', e);
        });
    } else {
      console.log('Errores en el formulario de registro');
    }
  }
}
