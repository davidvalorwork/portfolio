import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionComputacionalComponent } from './vision-computacional.component';

describe('VisionComputacionalComponent', () => {
  let component: VisionComputacionalComponent;
  let fixture: ComponentFixture<VisionComputacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionComputacionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisionComputacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
