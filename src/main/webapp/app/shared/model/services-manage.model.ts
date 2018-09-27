export interface IServicesManage {
    id?: number;
    name?: string;
}

export class ServicesManage implements IServicesManage {
    constructor(public id?: number, public name?: string) {}
}
