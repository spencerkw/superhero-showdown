import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterselectionComponent } from './characterselection.component';

describe('CharacterselectionComponent', () => {
  let component: CharacterselectionComponent;
  let fixture: ComponentFixture<CharacterselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
