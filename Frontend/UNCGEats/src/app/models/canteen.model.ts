export interface Canteen{
    Name : string
    Id?: number
    OwnerId: number
    Address : string
    Latitude : number
    Longitude : number
    FoodItems : number[]
    Description : string 
    WorkingHours : number
    Reviews : string[]
    AverageRating: number
    CreatedTime?: Date
    LastUpdated?: Date
    LastLogged ?: Date
}
