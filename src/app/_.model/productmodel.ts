export interface Product{
    productId : number,
    productName : string,
    price : number,
    details : string,
    brand : string,
    madeIn : string,
    rating : number,
    category : string,
    image : string,
    quantity : undefined | number,
    cartId : number | undefined,
    userId : number | undefined
}