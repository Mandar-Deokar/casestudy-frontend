export interface Order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    orderItemId:number[] |undefined,
    orderId : number | undefined
}

export interface OrderItem {
    productId : number,
    userId : number,
    quantity : number,
    orderId : number
}