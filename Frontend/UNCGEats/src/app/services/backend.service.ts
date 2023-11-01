import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AppSettings } from '../app-settings';
import { Owner } from '../models/owner.model';
import { Canteen } from '../models/canteen.model';
import { Order } from '../models/order.model';
import { FoodItem } from '../models/food-item.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  addFoodItem(foodItem: FoodItem) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    accept: 'text/plain',
  });

  apiUrl = new AppSettings().backendUrl;

  createUser(user: User): Observable<any> {
    user.CreatedTime = undefined;
    user.LastLogged = undefined;
    user.LastUpdated = undefined;
    user.Id = -1;
    return this.http.post<any>(
      new URL('user/createUser', 'http://localhost:8000').toString(),
      user
    );
  }

  isEmailExists(emailId: string): Observable<boolean> {
    // Send an HTTP GET request to check if the email exists
    const params = new HttpParams({
      fromString: `Email=${emailId}`,
    });
    return this.http.get<boolean>(
      new URL('user/isEmailExists', 'http://localhost:8000').toString(),
      { params }
    );
  }

  isUserValid(Name: string, Password: string): Observable<boolean> {
    // Create a request body with the user's credentials
    const requestBody = {
      Name: Name,
      Password: Password,
    };

    const params = new HttpParams({
      fromObject: requestBody,
    });

    // Send an HTTP POST request to validate the user
    return this.http.get<boolean>(
      new URL('user/isUserValid', 'http://localhost:8000').toString(),
      { params }
    );
  }

  getAllCanteens(): Observable<Canteen[]> {
    return this.http.get<Canteen[]>(
      new URL('canteen/getAllCanteens', 'http://localhost:8000').toString()
    );
  }

  createOwner(owner: Owner): Observable<any> {
    owner.CreatedTime = undefined;
    owner.LastLogged = undefined;
    owner.LastUpdated = undefined;
    owner.Id = -1;
    return this.http.post<any>(
      new URL('owner/createOwner', 'http://localhost:8000').toString(),
      owner
    );
  }

  createCanteen(canteen: Canteen): Observable<any> {
    canteen.CreatedTime = undefined;
    canteen.LastUpdated = undefined;
    canteen.Id = -1;
    return this.http.post<any>(
      new URL('canteen/createCanteen', 'http://localhost:8000').toString(),
      canteen
    );
  }

  createOrder(order: Order): Observable<any> {
    order.OrderedTime = undefined;
    order.PickupTime = undefined;
    order.LastUpdated = undefined;
    order.Id = -1;
    return this.http.post<any>(
      new URL('canteen/createCanteen', 'http://localhost:8000').toString(),
      order
    );
  }

  createFoodItem(food_item: FoodItem): Observable<any> {
    food_item.CreatedTime = undefined;
    food_item.LastUpdated = undefined;
    food_item.Id = -1;
    return this.http.post<any>(
      new URL('canteen/createCanteen', 'http://localhost:8000').toString(),
      food_item
    );
  }

  sendCanteenRequest(canteenRequest: FormGroup): Observable<boolean> {
    // Extract the canteen request data from the FormGroup
    const requestData = canteenRequest.value;
    const params = new HttpParams({
      fromObject: requestData,
    });

    // Send an HTTP POST request to send the canteen request
    return this.http.post<boolean>(
      new URL('canteen/sendCanteenRequest', 'http://localhost:8000').toString(),

      { params }
    );
  }
}
