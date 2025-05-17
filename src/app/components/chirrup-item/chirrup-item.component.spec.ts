import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChirrupItemComponent } from './chirrup-item.component';

describe('ChirrupItemComponent', () => {
  let component: ChirrupItemComponent;
  let fixture: ComponentFixture<ChirrupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChirrupItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChirrupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
