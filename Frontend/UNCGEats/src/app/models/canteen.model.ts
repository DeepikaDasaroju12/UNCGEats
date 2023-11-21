import { User } from "./user.model"

export interface Canteen{
    Name : string
    Id?: number
    OwnerId: number
    Address : string
    Latitude? : number
    Longitude? : number
    Description? : string
    WorkingHours : string
    AverageRating: number
    CreatedTime?: Date
    LastUpdated?: Date
    Image?: string
    _id?: string
    Deleted?: boolean
    Status? : CanteenStatus
    Comments? : string
}


export enum CanteenStatus {
    requested = 'Requested',
    approved = 'Approved',
    rejected = 'Rejected'
}

export interface CanteenRegistration {
  Id?: number;
  Created?: Date;
  OwnerId: number;
  CanteenId: number;
  Status: CanteenStatus;
  Comments?: string;
  LastUpdated?: Date;
  Canteen?: Canteen;
  Owner?: User;
}

