import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscadorCancionesPage } from './buscador-canciones.page';

const routes: Routes = [
  {
    path: '',
    component: BuscadorCancionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscadorCancionesPageRoutingModule {}
