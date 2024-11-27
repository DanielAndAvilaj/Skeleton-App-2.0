import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfinadorPage } from './afinador.page';

describe('AfinadorPage', () => {
  let component: AfinadorPage;
  let fixture: ComponentFixture<AfinadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AfinadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
