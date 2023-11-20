import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CanteenComponent } from './canteen/canteen.component';
import { FoodItemsListComponent } from './food-items-list/food-items-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { OwnerComponent } from './owner/owner.component';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { CanteenCardListViewComponent } from './canteen-card-list-view/canteen-card-list-view.component';
import { AddEditCanteenMenuComponent } from './add-edit-canteen-menu/add-edit-canteen-menu.component';
import { CustomerOrderHistoryComponent } from './customer-order-history/customer-order-history.component';
import { ManageCanteenComponent } from './manage-canteen/manage-canteen.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AddCanteenComponent } from './add-canteen/add-canteen.component';
import { AddCanteenStatusComponent } from './add-canteen-status/add-canteen-status.component';
import { ViewOwnersComponent } from './view-owners/view-owners.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { AddCanteenRequestsComponent } from './add-canteen-requests/add-canteen-requests.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'canteen', component: CanteenComponent },
  { path: 'owner', component: OwnerComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'food-items-list/:canteenName', component: FoodItemsListComponent },
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
      { path: 'requestNewCanteen', component: AddCanteenComponent },
      { path: 'canteenRequestStatus', component: AddCanteenStatusComponent },
      { path: 'viewAllOwners', component: ViewOwnersComponent },
      { path: 'viewAllCustomers', component: ViewCustomersComponent },
      { path: 'manageCanteenRequests', component: AddCanteenRequestsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
