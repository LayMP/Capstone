import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentaHoraClienteComponent } from './agenta-hora-cliente.component';

describe('AgentaHoraClienteComponent', () => {
  let component: AgentaHoraClienteComponent;
  let fixture: ComponentFixture<AgentaHoraClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentaHoraClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentaHoraClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
