import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCardComponentComponent } from './city-card-component.component';

describe('CityCardComponentComponent', () => {
  let component: CityCardComponentComponent;
  let fixture: ComponentFixture<CityCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityCardComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
