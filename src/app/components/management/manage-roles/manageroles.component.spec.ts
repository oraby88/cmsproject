import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerolesComponent } from './manageroles.component';

describe('ManagerolesComponent', () => {
  let component: ManagerolesComponent;
  let fixture: ComponentFixture<ManagerolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
