import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IStudentManage } from 'app/shared/model//student-manage.model';
import { ITeacherManage } from 'app/shared/model//teacher-manage.model';

export interface IStripeCustomerManage {
    id?: number;
    name?: string;
    created?: Moment;
    email?: string;
    currency?: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    stripeStatus?: string;
    plan?: string;
    ccBrand?: string;
    ccLast4?: number;
    expMonth?: string;
    expYear?: string;
    isCancelled?: boolean;
    cardId?: string;
    expectedExpiryDate?: Moment;
    user?: IUser;
    student?: IStudentManage;
    teacher?: ITeacherManage;
}

export class StripeCustomerManage implements IStripeCustomerManage {
    constructor(
        public id?: number,
        public name?: string,
        public created?: Moment,
        public email?: string,
        public currency?: string,
        public stripeCustomerId?: string,
        public stripeSubscriptionId?: string,
        public stripeStatus?: string,
        public plan?: string,
        public ccBrand?: string,
        public ccLast4?: number,
        public expMonth?: string,
        public expYear?: string,
        public isCancelled?: boolean,
        public cardId?: string,
        public expectedExpiryDate?: Moment,
        public user?: IUser,
        public student?: IStudentManage,
        public teacher?: ITeacherManage
    ) {
        this.isCancelled = this.isCancelled || false;
    }
}
