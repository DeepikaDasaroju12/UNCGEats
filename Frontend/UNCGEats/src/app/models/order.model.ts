import { FoodItem } from "./food-item.model";

export enum OrderStatusEnum {
  received = 'received',
  confirmed = 'confirmed',
  preparing = 'preparing',
  prepared = 'prepared',
  readyToPickup = 'readyToPickup',
  pickedUp = 'pickedUp',
  canceled = 'canceled',
}

export interface Order {
  Id?: number;
  CustomerId: number;
  OrderDate?: Date;
  CanteenId?: number;
  FoodItems?: { Id: number; Quantity: number }[];
  TotalPrice: number;
  TotalItems: number;
  OrderStatus?: OrderStatusEnum;
  OrderedTime?: Date;
  PickupTime?: Date;
  LastUpdated?: Date | null;
  formattedDate?: string;
  orderedItemsDetails?: {Id: number; Item: FoodItem; Quantity: number}[];
}
