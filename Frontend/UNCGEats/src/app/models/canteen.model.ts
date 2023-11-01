export interface Canteen{
    Name : string
    Id?: number
    OwnerId: number
    Address : string
    Latitude? : number
    Longitude? : number
    Description? : string
    WorkingHours : number
    AverageRating: number
    CreatedTime?: Date
    LastUpdated?: Date
    Image?: string
    _id?: string
}
