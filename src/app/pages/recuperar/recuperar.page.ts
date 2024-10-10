import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  username: string = '';
  email: string = '';

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async recuperarContrasena() {
    if (this.username && this.email) {
      // Aquí normalmente harías una llamada a un servicio de backend
      // Para este ejemplo, simularemos una respuesta exitosa
      console.log('Solicitando restablecimiento de contraseña para:', this.username, this.email);
      
      // Simulamos un retraso de 1 segundo para imitar una llamada a la API
      setTimeout(async () => {
        const alert = await this.alertController.create({
          header: 'Solicitud enviada',
          message: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.',
          buttons: ['OK']
        });

        await alert.present();
      }, 1000);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
}
