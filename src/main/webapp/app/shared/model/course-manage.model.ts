import { Moment } from 'moment';
import { IPlayListManage } from 'app/shared/model//play-list-manage.model';
import { IUser } from 'app/core/user/user.model';

export interface ICourseManage {
    id?: number;
    name?: string;
    slug?: string;
    type?: string;
    shortDesc?: string;
    categories?: string;
    active?: boolean;
    premium?: boolean;
    courseHrs?: string;
    tagLine?: string;
    premiumTill?: Moment;
    playlist?: IPlayListManage;
    user?: IUser;
}

export class CourseManage implements ICourseManage {
    constructor(
        public id?: number,
        public name?: string,
        public slug?: string,
        public type?: string,
        public shortDesc?: string,
        public categories?: string,
        public active?: boolean,
        public premium?: boolean,
        public courseHrs?: string,
        public tagLine?: string,
        public premiumTill?: Moment,
        public playlist?: IPlayListManage,
        public user?: IUser
    ) {
        this.active = this.active || false;
        this.premium = this.premium || false;
    }
}
