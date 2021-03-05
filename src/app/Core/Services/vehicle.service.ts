import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/Shared/Models/Vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  configUrl = 'https://localhost:44390/api/Vehicle/';
  
  constructor(private http: HttpClient) {}

  public getAllVehicle(): Observable<any>{
    return this.http.get<any>(this.configUrl + 'get-vehicle');
  }

  public createVehicle(data : Vehicle){
    return this.http.post(this.configUrl + 'create-vehicle', data);
  }

  public updateVehicle(data: Vehicle){
    return this.http.put(this.configUrl + 'update-vehicle/' + data.registration, data);
  }

  public deleteVehicle(key: string){
    return this.http.delete(this.configUrl + 'delete-vehicle/' + key);
  }
}
