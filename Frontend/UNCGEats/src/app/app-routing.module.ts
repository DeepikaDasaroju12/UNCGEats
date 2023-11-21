import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FoodItemsListComponent } from './food-items-list/food-items-list.component';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { CanteenCardListViewComponent } from './canteen-card-list-view/canteen-card-list-view.component';
import { AddEditCanteenMenuComponent } from './add-edit-canteen-menu/add-edit-canteen-menu.component';
import { CustomerOrderHistoryComponent } from './customer-order-history/customer-order-history.component';
import { ManageCanteenComponent } from './manage-canteen/manage-canteen.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ViewOwnersComponent } from './view-owners/view-owners.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { ManageCanteenRequestsComponent } from './manage-canteen-requests/manage-canteen-requests.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'userlanding',
    component: UserLandingPageComponent,
    children: [
      { path: 'viewCanteens', component: CanteenCardListViewComponent },
      { path: 'manageMenu', component: AddEditCanteenMenuComponent },
      { path: 'orderHistory', component: CustomerOrderHistoryComponent },
      { path: 'order/:canteenId', component: FoodItemsListComponent },
      { path: 'manageCanteen', component: ManageCanteenComponent },
      { path: 'manageOrders', component: ManageOrdersComponent },
      { path: 'viewAllOwners', component: ViewOwnersComponent },
      { path: 'viewAllCustomers', component: ViewCustomersComponent },
      {
        path: 'manageCanteenRequests',
        component: ManageCanteenRequestsComponent,
      },
      {
        path: 'editProfile',
        component: UserProfileEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
