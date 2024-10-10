import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userEmail: string = '';
  userPassword: string = '';
  userAge: number = 0;
  userPhone: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Obtener los datos del usuario del servicio
    const { email, password, age, phone } = this.userService.getUserData();
    this.userEmail = email;
    this.userPassword = password;
    this.userAge = age;
    this.userPhone = phone;
  }
}
