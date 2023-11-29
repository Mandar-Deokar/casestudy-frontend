export interface Order{
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    orderId : number | undefined
    orderItems: OrderItem[]| undefined
}

export interface OrderItem {
    productname : string,
    quantity : number,
    orderItemId : number,
    productPrice : number
}