import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service'; // Asegúrate de tener el servicio de base de datos

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userEmail: string = '';
  userPassword: string = '';
  userAge: number | null = null;
  userPhone: string = '';

  constructor(private dbService: DbService) {}

  ngOnInit() {
    this.loadUserData(); // Cargar los datos del usuario al iniciar la página
  }

  loadUserData() {
    this.dbService.getUsers().then(users => {
      if (users.length > 0) {
        const user = users[0]; // Asumimos que sólo hay un usuario o tomamos el primero
        this.userEmail = user.email;
        this.userPassword = user.password;
        this.userAge = user.age;
        this.userPhone = user.phone;
      }
    }).catch(e => {
      console.error('Error al cargar los datos del usuario', e);
    });
  }

  goToConfig() {
    // Navegación a la página de configuración si es necesario
  }
}
