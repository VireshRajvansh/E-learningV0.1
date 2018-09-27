import { Moment } from 'moment';

export interface IJobsManage {
    id?: number;
    name?: string;
    runOn?: Moment;
    type?: string;
    cronExpress?: string;
    isComplete?: boolean;
    msg?: string;
}

export class JobsManage implements IJobsManage {
    constructor(
        public id?: number,
        public name?: string,
        public runOn?: Moment,
        public type?: string,
        public cronExpress?: string,
        public isComplete?: boolean,
        public msg?: string
    ) {
        this.isComplete = this.isComplete || false;
    }
}
