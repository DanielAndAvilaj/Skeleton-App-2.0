import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service'; 
import { Storage } from '@ionic/storage-angular'; // Asegúrate de tener Storage importado
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginEmail: string = '';
  loginPassword: string = '';

  constructor(
    private router: Router,
    private dbService: DbService,
    private storage: Storage, // Inyectar Storage
    private alertController: AlertController
  ) {}

  // Función para manejar el inicio de sesión
  login() {
    // Validar si los campos de email y contraseña están completos
    if (!this.loginEmail || !this.loginPassword) {
      this.presentAlert('Error', 'Por favor ingresa tu email y contraseña');
      return;
    }

    // Consultar la base de datos para verificar el usuario
    this.dbService.getUsers().then((users) => {
      const user = users.find(
        (u) =>
          u.email === this.loginEmail && u.password === this.loginPassword
      );

      if (user) {
        console.log('Login exitoso:', user);

        // Almacenar el userId en el localStorage o Storage
        this.storage.set('userId', user.id).then(() => {
          console.log('User ID almacenado:', user.id);

          // Navegar a la página de inicio
          this.router.navigate(['/inicio'], {
            state: {
              usuario: user.email,
              contrasena: user.password,
              edad: user.age,
              telefono: user.phone,
            },
          });
        }).catch((error) => {
          console.error('Error al almacenar el userId:', error);
        });

      } else {
        this.presentAlert(
          'Credenciales Incorrectas',
          'El email o la contraseña son incorrectos'
        );
      }
    });
  }

  // Función auxiliar para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Navegar a la página de registro
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
