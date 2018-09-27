export interface IEducationManage {
    id?: number;
    name?: string;
}

export class EducationManage implements IEducationManage {
    constructor(public id?: number, public name?: string) {}
}
