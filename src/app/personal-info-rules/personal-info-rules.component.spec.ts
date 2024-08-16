import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoRulesComponent } from './personal-info-rules.component';

describe('PersonalInfoRulesComponent', () => {
  let component: PersonalInfoRulesComponent;
  let fixture: ComponentFixture<PersonalInfoRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInfoRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalInfoRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
