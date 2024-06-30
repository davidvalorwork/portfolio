import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafosInteligenciaComponent } from './grafos-inteligencia.component';

describe('GrafosInteligenciaComponent', () => {
  let component: GrafosInteligenciaComponent;
  let fixture: ComponentFixture<GrafosInteligenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrafosInteligenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrafosInteligenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
