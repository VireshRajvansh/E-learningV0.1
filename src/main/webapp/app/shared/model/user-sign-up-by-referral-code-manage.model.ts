import { IUser } from 'app/core/user/user.model';

export interface IUserSignUpByReferralCodeManage {
    id?: number;
    referralCode?: string;
    user?: IUser;
}

export class UserSignUpByReferralCodeManage implements IUserSignUpByReferralCodeManage {
    constructor(public id?: number, public referralCode?: string, public user?: IUser) {}
}
