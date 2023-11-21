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
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { CanteenCardListViewComponent } from './canteen-card-list-view/canteen-card-list-view.component';
import { AddEditCanteenMenuComponent } from './add-edit-canteen-menu/add-edit-canteen-menu.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomerOrderHistoryComponent } from './customer-order-history/customer-order-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { ManageCanteenComponent } from './manage-canteen/manage-canteen.component';
import { ViewOwnersComponent } from './view-owners/view-owners.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { ManageCanteenRequestsComponent } from './manage-canteen-requests/manage-canteen-requests.component';

// import { RequestsComponent } from './requests/requests.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodItemsListComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UserLandingPageComponent,
    CanteenCardListViewComponent,
    AddEditCanteenMenuComponent,
    CustomerOrderHistoryComponent,
    ManageCanteenComponent,
    ViewOwnersComponent,
    ViewCustomersComponent,
    ManageOrdersComponent,
    ManageCanteenRequestsComponent,
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
    MatTabsModule,
    MatChipsModule,
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
