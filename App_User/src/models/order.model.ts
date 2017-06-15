export class OrderModel {
    dateOrder: Date
    datePackage: Date
    dateDelivery: Date
    status: string
    totalCost: number
    addressDelivery: string
    listproduct: any[]=[]
}