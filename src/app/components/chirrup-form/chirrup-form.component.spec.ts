import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChirrupFormComponent } from './chirrup-form.component';

describe('ChirrupFormComponent', () => {
  let component: ChirrupFormComponent;
  let fixture: ComponentFixture<ChirrupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChirrupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChirrupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
