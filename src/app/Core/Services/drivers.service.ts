import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from 'src/app/Shared/Models/Driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  configUrl = 'https://localhost:44390/api/Driver/';
  
  constructor(private http: HttpClient) {}

  public getAllDrivers(): Observable<any>{
    return this.http.get<any>(this.configUrl + 'get-drivers');
  }

  public createDriver(data : Driver){
    return this.http.post(this.configUrl + 'create-client', data);
  }

  public updateDriver(data: Driver){
    return this.http.put(this.configUrl + 'update-client/' + data.employeeCode, data);
  }

  public deleteDriver(key: string){
    return this.http.delete(this.configUrl + 'delete-client/' + key);
  }
}
