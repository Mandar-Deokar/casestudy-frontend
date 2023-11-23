export interface User{
    
    userId : number,
    name : string,
    email : string,
    phone : string;
	address : {
        addressId : number, 
        street : string,
        city : string,
        state : string,
        pincode : string
    }

}