export interface CartItem{
    cartId : undefined | number,
    productName : string,
    price : number,
    details : string,
    brand : string,
    madeIn : string,
    rating : number,
    category : string,
    image : string,
    quantity : undefined | number
    userId : number,
    productId : number,
    cartItemId : number | undefined
}