import { Address } from "./addressmodel";

export interface User{
    
    userId : number,
    name : string,
    email : string,
    phone : string,
	address : Address,
    role : string

}