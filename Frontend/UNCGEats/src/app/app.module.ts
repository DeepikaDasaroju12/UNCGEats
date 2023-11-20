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
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { CanteenCardListViewComponent } from './canteen-card-list-view/canteen-card-list-view.component';
import { AddEditCanteenMenuComponent } from './add-edit-canteen-menu/add-edit-canteen-menu.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomerOrderHistoryComponent } from './customer-order-history/customer-order-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { ManageCanteenComponent } from './manage-canteen/manage-canteen.component';
import { AddCanteenComponent } from './add-canteen/add-canteen.component';
import { AddCanteenStatusComponent } from './add-canteen-status/add-canteen-status.component';
import { AddCanteenRequestsComponent } from './add-canteen-requests/add-canteen-requests.component';
import { ViewOwnersComponent } from './view-owners/view-owners.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
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
    UserLandingPageComponent,
    CanteenCardListViewComponent,
    AddEditCanteenMenuComponent,
    CustomerOrderHistoryComponent,
    ManageCanteenComponent,
    AddCanteenComponent,
    AddCanteenStatusComponent,
    AddCanteenRequestsComponent,
    ViewOwnersComponent,
    ViewCustomersComponent,
    ManageOrdersComponent,
  ],
  imports: [
    MdbCarouselModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
