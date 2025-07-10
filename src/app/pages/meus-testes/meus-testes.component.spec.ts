import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusTestesComponent } from './meus-testes.component';

describe('MeusTestesComponent', () => {
  let component: MeusTestesComponent;
  let fixture: ComponentFixture<MeusTestesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusTestesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusTestesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
