import { ICityManage } from 'app/shared/model//city-manage.model';

export interface IStateManage {
    id?: number;
    name?: string;
    slug?: string;
    cities?: ICityManage[];
}

export class StateManage implements IStateManage {
    constructor(public id?: number, public name?: string, public slug?: string, public cities?: ICityManage[]) {}
}
