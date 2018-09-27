import { Moment } from 'moment';
import { IStripeCustomerManage } from 'app/shared/model//stripe-customer-manage.model';
import { IUser } from 'app/core/user/user.model';
import { IAddressManage } from 'app/shared/model//address-manage.model';
import { IEducationCollegeManage } from 'app/shared/model//education-college-manage.model';

export interface IStudentManage {
    id?: number;
    name?: string;
    about?: string;
    imageUrl?: string;
    collegeYear?: number;
    dob?: Moment;
    mobile?: string;
    alternativeMobile?: string;
    premium?: boolean;
    active?: boolean;
    languagesSpoken?: string;
    slug?: string;
    premiumTill?: Moment;
    referenceCode?: string;
    signUpByReferenceCode?: string;
    websiteURL?: string;
    twitter?: string;
    facebook?: string;
    googlePlus?: string;
    linkedIn?: string;
    stripeCustomer?: IStripeCustomerManage;
    user?: IUser;
    address?: IAddressManage;
    college?: IEducationCollegeManage;
}

export class StudentManage implements IStudentManage {
    constructor(
        public id?: number,
        public name?: string,
        public about?: string,
        public imageUrl?: string,
        public collegeYear?: number,
        public dob?: Moment,
        public mobile?: string,
        public alternativeMobile?: string,
        public premium?: boolean,
        public active?: boolean,
        public languagesSpoken?: string,
        public slug?: string,
        public premiumTill?: Moment,
        public referenceCode?: string,
        public signUpByReferenceCode?: string,
        public websiteURL?: string,
        public twitter?: string,
        public facebook?: string,
        public googlePlus?: string,
        public linkedIn?: string,
        public stripeCustomer?: IStripeCustomerManage,
        public user?: IUser,
        public address?: IAddressManage,
        public college?: IEducationCollegeManage
    ) {
        this.premium = this.premium || false;
        this.active = this.active || false;
    }
}
