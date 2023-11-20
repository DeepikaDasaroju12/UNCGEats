import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AppSettings } from '../app-settings';
import { Canteen, CanteenRegistration } from '../models/canteen.model';
import { Order } from '../models/order.model';
import { FoodItem } from '../models/food-item.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    accept: 'text/plain',
  });

  apiUrl = new AppSettings().backendUrl;

  createUser(user: User): Observable<any> {
    user.Created = undefined;
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

  isUserValid(
    Email: string,
    Password: string,
    UserType: string
  ): Observable<boolean> {
    // Create a request body with the user's credentials
    const requestBody = {
      Email: Email,
      Password: Password,
      UserType: UserType,
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

  updateUserLastLogged(id: number): Observable<Record<string, any>> {
    return this.http.put<Record<string, any>>(
      new URL('user/updateUserLastLogged', 'http://localhost:8000').toString(),
      {},
      {
        params: {
          Id: id,
        },
      }
    );
  }

  loginUser(
    Email: string,
    Password: string,
    UserType: string
  ): Observable<Record<string, any>> {
    // Create a request body with the user's credentials
    const requestBody = {
      Email: Email,
      Password: Password,
      UserType: UserType,
    };

    const params = new HttpParams({
      fromObject: requestBody,
    });

    return this.http.get<Record<string, any>>(
      new URL('user/loginUser', 'http://localhost:8000').toString(),
      { params }
    );
  }

  getAllCanteens(): Observable<Canteen[]> {
    return this.http.get<Canteen[]>(
      new URL('canteen/getAllCanteens', 'http://localhost:8000').toString()
    );
  }

  getCanteensForUser(id: number): Observable<Canteen[]> {
    return this.http.get<Canteen[]>(
      new URL(
        'canteen/getAllCanteensForUser',
        'http://localhost:8000'
      ).toString(),
      { params: { Id: id } }
    );
  }

  createCanteen(
    canteen: Canteen,
    canteenRequest: CanteenRegistration
  ): Observable<any> {
    canteen.CreatedTime = undefined;
    canteen.LastUpdated = undefined;
    canteen.Id = -1;
    return this.http.post<any>(
      new URL('canteen/createCanteen', 'http://localhost:8000').toString(),
      {
        canteen: canteen,
        canteenRequest: canteenRequest,
      }
    );
  }

  createOrder(order: Order): Observable<any> {
    order.OrderedTime = undefined;
    order.PickupTime = undefined;
    order.LastUpdated = undefined;
    order.Id = -1;
    return this.http.post<any>(
      new URL('order/createOrder', 'http://localhost:8000').toString(),
      order
    );
  }

  createFoodItem(food_item: FoodItem): Observable<any> {
    food_item.CreatedTime = undefined;
    food_item.LastUpdated = undefined;
    food_item.Id = -1;
    return this.http.post<any>(
      new URL('food_item/createFoodItem/', 'http://localhost:8000').toString(),
      food_item
    );
  }

  getFoodItem(id: number): Observable<FoodItem> {
    return this.http.get<FoodItem>(
      new URL('food_item/getFoodItem/', 'http://localhost:8000').toString(),
      {
        params: {
          Id: id,
        },
      }
    );
  }

  updateFoodItem(id: number, changes: any): Observable<any> {
    return this.http.put<any>(
      new URL('food_item/updateFoodItem/', 'http://localhost:8000').toString(),
      changes,
      {
        params: {
          Id: id,
        },
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }
    );
  }

  updateCanteen(id: number, changes: any): Observable<any> {
    return this.http.put<any>(
      new URL('canteen/updateCanteen/', 'http://localhost:8000').toString(),
      changes,
      {
        params: {
          Id: id,
        },
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }
    );
  }

  deleteFoodItem(id: number): Observable<any> {
    return this.http.delete<any>(
      new URL('food_item/deleteFoodItem', 'http://localhost:8000').toString(),
      {
        params: {
          Id: id,
        },
      }
    );
  }

  deleteCanteen(id: number): Observable<any> {
    return this.http.delete<any>(
      new URL('canteen/deleteCanteen', 'http://localhost:8000').toString(),
      {
        params: {
          Id: id,
        },
      }
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

  getCanteenMenu(canteenId: number): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(
      new URL('food_item/getCanteenMenu', 'http://localhost:8000').toString(),
      {
        params: {
          Id: canteenId,
        },
      }
    );
  }

  getOrderHistory(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(
      new URL('order/getOrdersForCustomer', 'http://localhost:8000').toString(),
      {
        params: {
          Id: customerId,
        },
      }
    );
  }

  getPendingCanteens(ownerId: number): Observable<Canteen[]> {
    return this.http.get<Canteen[]>(
      new URL(
        'canteen/getPendingCanteensForOwner',
        'http://localhost:8000'
      ).toString(),
      { params: { Id: ownerId } }
    );
  }

  getRejectedCanteens(ownerId: number): Observable<Canteen[]> {
    return this.http.get<Canteen[]>(
      new URL(
        'canteen/getRejectedCanteensForOwner',
        'http://localhost:8000'
      ).toString(),
      { params: { Id: ownerId } }
    );
  }

  getActiveCanteenOrders(canteenId: number): Observable<Order[]> {
    return this.http.get<Order[]>(
      new URL(
        'order/getActiveOrdersForCanteen',
        'http://localhost:8000'
      ).toString(),
      { params: { Id: canteenId } }
    );
  }

  getClosedCanteenOrders(canteenId: number): Observable<Order[]> {
    return this.http.get<Order[]>(
      new URL(
        'order/getClosedOrdersForCanteen',
        'http://localhost:8000'
      ).toString(),
      { params: { Id: canteenId } }
    );
  }

  updateOrder(id: number, changes: any): Observable<any> {
    return this.http.put<any>(
      new URL('order/updateOrder', 'http://localhost:8000').toString(),
      changes,
      {
        params: {
          Id: id,
        },
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }
    );
  }
}
