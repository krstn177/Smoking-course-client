import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqModuleComponent } from './faq-module.component';

describe('FaqModuleComponent', () => {
  let component: FaqModuleComponent;
  let fixture: ComponentFixture<FaqModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaqModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
