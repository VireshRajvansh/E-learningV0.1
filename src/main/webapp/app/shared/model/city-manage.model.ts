import { IStateManage } from 'app/shared/model//state-manage.model';

export interface ICityManage {
    id?: number;
    name?: string;
    slug?: string;
    state?: IStateManage;
}

export class CityManage implements ICityManage {
    constructor(public id?: number, public name?: string, public slug?: string, public state?: IStateManage) {}
}
