import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinguettioListComponent } from './cinguettio-list.component';

describe('CinguettioListComponent', () => {
  let component: CinguettioListComponent;
  let fixture: ComponentFixture<CinguettioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChirrupListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinguettioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
