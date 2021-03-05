import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { client } from 'src/app/Shared/Models/client.model';

@Injectable(
  //providedIn: 'root'
)
export class ClientService {

  configUrl = 'https://localhost:44390/api/Client/';
  
  constructor(private http: HttpClient) {}

  public getAllClients(): Observable<any>{
    return this.http.get<any>(this.configUrl + 'get-client');
  }
  public createClient(data : client){
    return this.http.post(this.configUrl + 'create-client', data);
  }

  public updateClient(data: client){
    return this.http.put(this.configUrl + 'update-client/' + data.clientID, data);
  }

  public deleteClient(key: string){
    return this.http.delete(this.configUrl + 'delete-client/' + key);
  }
}
