import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscadorCancionesPage } from './buscador-canciones.page';

describe('BuscadorCancionesPage', () => {
  let component: BuscadorCancionesPage;
  let fixture: ComponentFixture<BuscadorCancionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCancionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
