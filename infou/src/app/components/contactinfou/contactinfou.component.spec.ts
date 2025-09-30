import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactinfouComponent } from './contactinfou.component';

describe('ContactinfouComponent', () => {
  let component: ContactinfouComponent;
  let fixture: ComponentFixture<ContactinfouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactinfouComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactinfouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
