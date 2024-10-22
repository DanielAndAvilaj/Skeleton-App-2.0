import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

// Importaciones añadidas para SQLite, Storage y servicios
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbService } from './services/db.service';
import { SpotifyService } from './services/spotify.service'; // Importa SpotifyService
import { IonicStorageModule } from '@ionic/storage-angular'; // Importa el Storage de Ionic

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule, // Importa HttpClientModule
    IonicStorageModule.forRoot() // Configura el módulo de Storage para toda la app
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SpotifyService, // Añadimos SpotifyService como proveedor
    SQLite, // Añadimos SQLite como proveedor
    DbService // Añadimos DbService como proveedor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
