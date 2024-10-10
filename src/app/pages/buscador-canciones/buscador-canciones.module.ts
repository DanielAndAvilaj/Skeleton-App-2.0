import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscadorCancionesPageRoutingModule } from './buscador-canciones-routing.module';

import { BuscadorCancionesPage } from './buscador-canciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscadorCancionesPageRoutingModule
  ],
  declarations: [BuscadorCancionesPage]
})
export class BuscadorCancionesPageModule {}
