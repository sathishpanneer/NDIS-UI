import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Core/Header/header/header.component';
import { FooterComponent } from './Core/Footer/footer/footer.component';
import { GlobalErrorHandlingComponent } from './Shared/ErrorHandler/global-error-handling/global-error-handling.component';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule} from '@angular/material/card';
import { MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule} from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { ClientsComponent } from './clients/clients.component';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { from } from 'rxjs';
import { ClientService } from './Core/Services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { UpdateClientComponent } from './clients/update-client/update-client.component';
import { DeleteClientComponent } from './clients/delete-client/delete-client.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DriversComponent } from './drivers/drivers.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AddVehicleComponent } from './vehicles/add-vehicle/add-vehicle.component';
import { UpdateVehicleComponent } from './vehicles/update-vehicle/update-vehicle.component';
import { DeletVehicleComponent } from './vehicles/delet-vehicle/delet-vehicle.component';
import { AddDriverComponent } from './drivers/add-driver/add-driver.component';
import { UpdateDriverComponent } from './drivers/update-driver/update-driver.component';
import { DeleteDriverComponent } from './drivers/delete-driver/delete-driver.component';
import { TripComponent } from './trip/trip.component';
import { AddTripComponent } from './trip/add-trip/add-trip.component';
import { UpdateTripComponent } from './trip/update-trip/update-trip.component';
import { DeleteTripComponent } from './trip/delete-trip/delete-trip.component';
import { SettingsComponent } from './Settings/settings.component';
import { TripTypeComponent } from './Settings/trip-type/trip-type.component';
import { CostCentreComponent } from './Settings/cost-centre/cost-centre.component';
import { RatesComponent } from './Settings/rates/rates.component';
import { SalesForceServicesComponent } from './Settings/sales-force-services/sales-force-services.component';
import { AddTripTypeComponent } from './Settings/trip-type/add-trip-type/add-trip-type.component';
import { EditTripTypeComponent } from './Settings/trip-type/edit-trip-type/edit-trip-type.component';
import { DeleteTripTypeComponent } from './Settings/trip-type/delete-trip-type/delete-trip-type.component';
import { AddCostCentreComponent } from './Settings/cost-centre/add-cost-centre/add-cost-centre.component';
import { UpdateCostCentreComponent } from './Settings/cost-centre/update-cost-centre/update-cost-centre.component';
import { DeleteCostCentreComponent } from './Settings/cost-centre/delete-cost-centre/delete-cost-centre.component';
import dxDataGrid from 'devextreme/ui/data_grid';
import { BillingLineComponent } from './billing-line/billing-line.component';
import { DxButtonModule, DxContextMenuModule, DxDataGridModule, DxDateBoxModule } from 'devextreme-angular';
import dxButton from 'devextreme/ui/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GlobalErrorHandlingComponent,
    LoginComponent,
    HomeComponent,
    ClientsComponent,
    AddClientComponent,
    UpdateClientComponent,
    DeleteClientComponent,
    DriversComponent,
    VehiclesComponent,
    AddVehicleComponent,
    UpdateVehicleComponent,
    DeletVehicleComponent,
    AddDriverComponent,
    UpdateDriverComponent,
    DeleteDriverComponent,
    TripComponent,
    AddTripComponent,
    UpdateTripComponent,
    DeleteTripComponent,
    SettingsComponent,
    TripTypeComponent,
    CostCentreComponent,
    RatesComponent,
    SalesForceServicesComponent,
    AddTripTypeComponent,
    EditTripTypeComponent,
    DeleteTripTypeComponent,
    AddCostCentreComponent,
    UpdateCostCentreComponent,
    DeleteCostCentreComponent,
    BillingLineComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgMaterialMultilevelMenuModule,
    MatCheckboxModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxContextMenuModule,
    DxButtonModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [
    AddClientComponent,
    UpdateClientComponent,
  ],
  providers: [
    NgxSpinnerService,
    MultilevelMenuService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
