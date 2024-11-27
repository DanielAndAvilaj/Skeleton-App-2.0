import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfinadorPageRoutingModule } from './afinador-routing.module';

import { AfinadorPage } from './afinador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfinadorPageRoutingModule
  ],
  declarations: [AfinadorPage]
})
export class AfinadorPageModule {}
