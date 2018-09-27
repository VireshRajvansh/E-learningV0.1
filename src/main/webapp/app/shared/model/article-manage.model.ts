import { IUser } from 'app/core/user/user.model';

export interface IArticleManage {
    id?: number;
    name?: string;
    slug?: string;
    type?: string;
    tagLine?: string;
    categories?: string;
    active?: boolean;
    user?: IUser;
}

export class ArticleManage implements IArticleManage {
    constructor(
        public id?: number,
        public name?: string,
        public slug?: string,
        public type?: string,
        public tagLine?: string,
        public categories?: string,
        public active?: boolean,
        public user?: IUser
    ) {
        this.active = this.active || false;
    }
}
