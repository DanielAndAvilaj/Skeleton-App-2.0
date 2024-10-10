import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'error404',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  },
  {
    path: 'buscador-canciones',
    loadChildren: () => import('./pages/buscador-canciones/buscador-canciones.module').then(m => m.BuscadorCancionesPageModule)
  },
  // Ruta comodín para redirigir a la página de error 404
  {
    path: '**',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
