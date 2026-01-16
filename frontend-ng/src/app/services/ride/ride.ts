import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) { }

  requestRide(data: any) {
    return this.http.post(`${this.api}/rides/request`, data);
  }

  getRequestedRides() {
    return this.http.get(`${this.api}/rides`);
  }

  acceptRide(rideId: number, driver_id: number) {
    return this.http.patch(`${this.api}/rides/${rideId}/accept`, { driver_id });
  }

  startRide(rideId: number) {
    return this.http.patch(`${this.api}/rides/${rideId}/start`, {});
  }

  completeRide(rideId: number, fare: number) {
    return this.http.patch(`${this.api}/rides/${rideId}/complete`, { fare });
  }
}
