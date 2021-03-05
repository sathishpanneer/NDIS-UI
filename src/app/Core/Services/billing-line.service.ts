import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillingLine } from 'src/app/Shared/Models/BillingLine.model';

@Injectable({
  providedIn: 'root'
})
export class BillingLineService {

  configUrl = 'https://localhost:44390/api/BillingLine/';
  
  constructor(private http: HttpClient) {}

  public getAllBillingLines(): Observable<any>{
    return this.http.get<any>(this.configUrl + 'get-billing-lines');
  }

  public createBillingLine(data : BillingLine){
    return this.http.post(this.configUrl + 'create-billing-line', data);
  }

  public updateBillingLine(data: BillingLine, billingId: number){
    return this.http.put(this.configUrl + 'update-billing-line/' + billingId, data);
  }

  public deleteBillingLine(key: string){
    return this.http.delete(this.configUrl + 'delete-billing-line/' + key);
  }
}
