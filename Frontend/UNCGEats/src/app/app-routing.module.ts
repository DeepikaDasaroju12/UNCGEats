import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CanteenComponent } from './canteen/canteen.component';
import {FoodItemsListComponent} from './food-items-list/food-items-list.component'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { OwnerComponent } from './owner/owner.component';
import { UserCanteenListViewComponent } from './user-canteen-list-view/user-canteen-list-view.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'canteen', component: CanteenComponent },
  { path: 'owner', component: OwnerComponent },
  // { path: 'admin/food-items-list/:canteenName', component: FoodItemsListComponent },
  // { path: 'admin/orders', component: OrdersComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'food-items-list/:canteenName', component: FoodItemsListComponent },
  {path: 'canteens', component: UserCanteenListViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
