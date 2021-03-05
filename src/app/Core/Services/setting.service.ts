import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CostCentre } from 'src/app/Shared/Models/CostCentre.model';
import { Trip } from 'src/app/Shared/Models/Trip.model';
import { TripTypeInput } from 'src/app/Shared/Models/TripTypeInput.model';
import { TripTypes } from 'src/app/Shared/Models/TripTypes.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  configUrl = 'https://localhost:44390/api/Setting/';
  
  constructor(private http: HttpClient) {}

  public getAllTripTypes(): Observable<any>{
    return this.http.get<any>(this.configUrl + 'get-trip-types');
  }

  public createTripType(data : TripTypeInput){
    return this.http.post(this.configUrl + 'create-trip-type', data);
  }

  public updateTripType(data: TripTypeInput){
    return this.http.put(this.configUrl + 'update-trip-type/' + data.tripTypeID, data);
  }

  public deleteTripType(tripTypeID: number){
    return this.http.delete(this.configUrl + 'delete-trip-type/' + tripTypeID);
  }

  public getAllCostCentres(): Observable<any>{
    return this.http.get<any>(this.configUrl + 'get-cost-centers');
  }

  public createCostCentre(data : CostCentre){
    return this.http.post(this.configUrl + 'create-cost-centre', data);
  }

  public updateCostCentre(data: CostCentre){
    return this.http.put(this.configUrl + 'update-cost-centre/' + data.costCentre, data);
  }

  public deleteCostCentre(costCentreId: string){
    return this.http.delete(this.configUrl + 'delete-trip-type/' + costCentreId);
  }

  public getAllRates(): Observable<any>{
    return this.http.get<any>(this.configUrl + 'get-rates');
  }

  public getAllSalesforceSevice(): Observable<any>{
    return this.http.get<any>(this.configUrl + 'get-sales-force-service');
  }
}
