enum OrderStatusEnum {
    received = 'received',
    confirmed = 'confirmed',
    preparing = 'preparing',
    prepared = 'prepared',
    readyToPickup = 'readyToPickup'
  }


  export interface Order {
    Id?: number;
    CustomerId : number;
    OrderDate?: Date;
    CanteenId?: number;
    FoodItems?: number[];
    TotalPrice: number;
    TotalItems: number;
    OrderStatus?: OrderStatusEnum;
    OrderedTime?: Date;
    PickupTime?: Date;
    LastUpdated?: Date | null;
  }