import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroHoraDisponibleComponent } from './registro-hora-disponible.component';

describe('RegistroHoraDisponibleComponent', () => {
  let component: RegistroHoraDisponibleComponent;
  let fixture: ComponentFixture<RegistroHoraDisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroHoraDisponibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroHoraDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
