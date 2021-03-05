import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingLineComponent } from './billing-line/billing-line.component';
import { ClientsComponent } from './clients/clients.component';
import { DriversComponent } from './drivers/drivers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CostCentreComponent } from './Settings/cost-centre/cost-centre.component';
import { RatesComponent } from './Settings/rates/rates.component';
import { SalesForceServicesComponent } from './Settings/sales-force-services/sales-force-services.component';
import { TripTypeComponent } from './Settings/trip-type/trip-type.component';
import { TripComponent } from './trip/trip.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'drivers', component: DriversComponent},
  {path: 'vehicles', component: VehiclesComponent},
  {path: 'trips', component: TripComponent},
  {path: 'trip_types', component: TripTypeComponent},
  {path: 'cost_centres', component: CostCentreComponent},
  {path: 'rates', component: RatesComponent},
  {path: 'salesforce_services', component:SalesForceServicesComponent},
  {path: 'billing', component: BillingLineComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
