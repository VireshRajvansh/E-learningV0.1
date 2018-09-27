export interface IStripeTransactionManage {
    id?: number;
    stripResponse?: string;
}

export class StripeTransactionManage implements IStripeTransactionManage {
    constructor(public id?: number, public stripResponse?: string) {}
}
