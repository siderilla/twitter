import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChirrupListComponent } from './chirrup-list.component';

describe('ChirrupListComponent', () => {
  let component: ChirrupListComponent;
  let fixture: ComponentFixture<ChirrupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChirrupListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChirrupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
