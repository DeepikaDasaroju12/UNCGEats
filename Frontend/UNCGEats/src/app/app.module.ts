import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FoodItemsListComponent } from './food-items-list/food-items-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CanteenComponent } from './canteen/canteen.component';
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { OwnerComponent } from './owner/owner.component';
import { UserCanteenListViewComponent } from './user-canteen-list-view/user-canteen-list-view.component';
// import { RequestsComponent } from './requests/requests.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodItemsListComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CanteenComponent,
    AdminDashboardComponent,
    OrdersComponent,
    OwnerComponent,
    UserCanteenListViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
