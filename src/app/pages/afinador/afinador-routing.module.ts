import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfinadorPage } from './afinador.page';

const routes: Routes = [
  {
    path: '',
    component: AfinadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfinadorPageRoutingModule {}
