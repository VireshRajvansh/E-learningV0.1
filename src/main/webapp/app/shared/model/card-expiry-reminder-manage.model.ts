import { Moment } from 'moment';

export interface ICardExpiryReminderManage {
    id?: number;
    userId?: number;
    messageType?: string;
    sendOnDate?: Moment;
    isComplete?: boolean;
    refData?: string;
}

export class CardExpiryReminderManage implements ICardExpiryReminderManage {
    constructor(
        public id?: number,
        public userId?: number,
        public messageType?: string,
        public sendOnDate?: Moment,
        public isComplete?: boolean,
        public refData?: string
    ) {
        this.isComplete = this.isComplete || false;
    }
}
