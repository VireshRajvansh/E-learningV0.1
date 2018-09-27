import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IStripePaymentManage {
    id?: number;
    stripeCustomerId?: string;
    invoiceId?: string;
    planId?: string;
    planName?: string;
    charge?: string;
    created?: Moment;
    amount?: number;
    planAmount?: number;
    planCreated?: Moment;
    planCurrency?: string;
    planInterval?: string;
    planIntervalCount?: number;
    liveMode?: boolean;
    paid?: boolean;
    periodEnd?: Moment;
    periodStart?: Moment;
    subscriptionValue?: string;
    subtotal?: number;
    tax?: string;
    taxPercent?: string;
    taxDisplayName?: string;
    total?: number;
    currency?: string;
    stripeCode?: string;
    isSuccess?: boolean;
    invoiceNumber?: string;
    user?: IUser;
}

export class StripePaymentManage implements IStripePaymentManage {
    constructor(
        public id?: number,
        public stripeCustomerId?: string,
        public invoiceId?: string,
        public planId?: string,
        public planName?: string,
        public charge?: string,
        public created?: Moment,
        public amount?: number,
        public planAmount?: number,
        public planCreated?: Moment,
        public planCurrency?: string,
        public planInterval?: string,
        public planIntervalCount?: number,
        public liveMode?: boolean,
        public paid?: boolean,
        public periodEnd?: Moment,
        public periodStart?: Moment,
        public subscriptionValue?: string,
        public subtotal?: number,
        public tax?: string,
        public taxPercent?: string,
        public taxDisplayName?: string,
        public total?: number,
        public currency?: string,
        public stripeCode?: string,
        public isSuccess?: boolean,
        public invoiceNumber?: string,
        public user?: IUser
    ) {
        this.liveMode = this.liveMode || false;
        this.paid = this.paid || false;
        this.isSuccess = this.isSuccess || false;
    }
}
