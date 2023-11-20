export interface User {
  FirstName: string;
  LastName: string;
  MiddleName: string;
  PhoneNumber: number;
  Email: string;
  Id?: number;
  Created?: Date;
  LastUpdated?: Date;
  LastLogged?: Date;
  Password: string;
  UserType: string;
  deleted?: boolean
}
