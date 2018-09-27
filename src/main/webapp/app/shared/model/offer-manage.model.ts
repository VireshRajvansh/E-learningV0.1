export interface IOfferManage {
    id?: number;
    name?: string;
}

export class OfferManage implements IOfferManage {
    constructor(public id?: number, public name?: string) {}
}
