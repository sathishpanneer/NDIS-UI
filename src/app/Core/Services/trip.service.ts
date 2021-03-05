import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/Shared/Models/Trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  configUrl = 'https://localhost:44390/api/Trip/';
  
  constructor(private http: HttpClient) {}

  public getAllTrips(): Observable<any>{
    return this.http.get<any>(this.configUrl + 'get-trip');
  }

  public createTrip(data : Trip){
    return this.http.post(this.configUrl + 'create-trip', data);
  }

  public updateTrip(data: Trip){
    return this.http.put(this.configUrl + 'update-trip/' + data.tripID, data);
  }

  public deleteTrip(tripId: number){
    return this.http.delete(this.configUrl + 'delete-trip/' + tripId);
  }

}
