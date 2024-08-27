import {IType} from "./IPoke.ts";

export interface IRequest {
    count:number
    next:string
    previous:null|string
    results: IType[]
}
