import { Component, OnInit } from '@angular/core';
import { MultilevelNodes } from 'ng-material-multilevel-menu';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  navItems: MultilevelNodes[] = [
    // {label: 'Trips', link: '/appSetting', icon: 'app_settings_alt'},
    {label: 'Trips', link: '/trips', icon: 'map'},
    {label: 'Clients', link: '/clients', icon: 'people_outline'},
    {label: 'Resources', link: '/drivers', icon: 'groups'},
    {label: 'Vehicles', link: '/vehicles', icon: 'directions_car'},
    {label: 'Billing', link: '/billing',icon: 'receipt'},
    {label: 'Settings',
     icon: 'settings',
     items : [
       {
         label: 'Trip Types', link: '/trip_types', icon : 'gps_fixed'
       },
       {
        label: 'Cost Centres', link: '/cost_centres', icon : 'account_balance'
       },
       {
        label: 'Rates', link: '/rates', icon : 'monetization_on'
       },
       {
        label: 'Sales Force Services', link: '/salesforce_services', icon : 'rate_review'
       },
     ]
    }
  ];

  selectedItem($event: any) {
    console.log($event);
  }
}
