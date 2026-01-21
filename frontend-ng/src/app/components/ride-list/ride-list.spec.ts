import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RideListComponent } from './ride-list';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('RideListComponent', () => {
  let component: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RideListComponent,
        HttpClientTestingModule,
        MatCardModule,
        MatButtonModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RideListComponent);
    component = fixture.componentInstance;

    // Mock the rides$ observable
    component.rides$ = of([
      { ride_id: 1, pickup_location: 'A', drop_location: 'B', status: 'requested' }
    ]);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ride cards when rides exist', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card')).toBeTruthy();
    expect(compiled.querySelector('mat-card-title')?.textContent).toContain('Ride #1');
  });
});
