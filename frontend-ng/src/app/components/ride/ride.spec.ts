import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RideComponent } from './ride';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';

describe('RideComponent', () => {
  let component: RideComponent;
  let fixture: ComponentFixture<RideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RideComponent,
        HttpClientTestingModule,
        MatCardModule,
        MatButtonModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
