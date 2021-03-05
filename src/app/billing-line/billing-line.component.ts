import { Component, OnInit } from '@angular/core';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import DataSource from 'devextreme/data/data_source';
import { BillingLineService } from '../Core/Services/billing-line.service';
import { BillingLine } from '../Shared/Models/BillingLine.model';

export interface unitOfMeasures{
  ID: number;
  Name: string;
}

let unitOfMeasureLookup: unitOfMeasures[] = [
  {ID : 1, Name : 'KM'},
  {ID : 2, Name : 'Flat'}
]

@Component({
  selector: 'app-billing-line',
  templateUrl: './billing-line.component.html',
  styleUrls: ['./billing-line.component.scss']
})
export class BillingLineComponent implements OnInit {
  unitOfMeasureLook: unitOfMeasures[] = unitOfMeasureLookup;
  dataSource: BillingLine[];
  events: Array<string> = [];
  now: Date = new Date();
  startValue: Date = new Date();
  endValue: Date = new Date();
  constructor( private billingLineService: BillingLineService) { }

  ngOnInit() {
    this.GetAllBillingLines();
  }

  logEvent(eventName: any) {
    this.events.unshift(eventName);
}

AddBillingLine(event: any){
  console.log(event);

  if(event.changes[0].type == "insert"){
    event.changes[0].data.unitOfMeasure = event.changes[0].data.unitOfMeasure == 1 ? "KM" : "Flat";
    this.billingLineService.createBillingLine(event.changes[0].data).subscribe(res => {
      if(res) {
        
        this.GetAllBillingLines();
      } 
    })
  } else if(event.changes[0].type == "update"){
    event.changes[0].data.unitOfMeasure = event.changes[0].data.unitOfMeasure == 1 ? "KM" : "Flat";
    this.billingLineService.updateBillingLine(event.changes[0].data, event.changes[0].key).subscribe(res => {
      if (res) {
        
        this.GetAllBillingLines();
      } 
    })
  }
  
}

DeleteBillingLine(event: any){
  console.log(event);

  //if(event.changes[0].type == "insert"){
    this.billingLineService.deleteBillingLine(event.key).subscribe(res => {
      if(res) {
        
        this.GetAllBillingLines();
      } 
    })
  //}
  
}


setStateValue(rowData: any, value: any): void {
  rowData.ID = null;
  (<any>this).defaultSetCellValue(rowData, value);
}
  GetAllBillingLines(){
    this.billingLineService.getAllBillingLines().subscribe(data => {
      if(data){
        //this.dataSource.keys = data.getBillingLines.billingID;
        this.dataSource = data.getBillingLines;
      }
    })
  }
}
