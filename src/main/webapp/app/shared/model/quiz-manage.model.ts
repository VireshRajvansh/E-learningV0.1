import { IQuizAnsManage } from 'app/shared/model//quiz-ans-manage.model';
import { IUser } from 'app/core/user/user.model';

export interface IQuizManage {
    id?: number;
    name?: string;
    slug?: string;
    text?: string;
    type?: string;
    shortDesc?: string;
    isComplete?: boolean;
    tagLine?: string;
    active?: boolean;
    selected?: boolean;
    quizAns?: IQuizAnsManage;
    user?: IUser;
}

export class QuizManage implements IQuizManage {
    constructor(
        public id?: number,
        public name?: string,
        public slug?: string,
        public text?: string,
        public type?: string,
        public shortDesc?: string,
        public isComplete?: boolean,
        public tagLine?: string,
        public active?: boolean,
        public selected?: boolean,
        public quizAns?: IQuizAnsManage,
        public user?: IUser
    ) {
        this.isComplete = this.isComplete || false;
        this.active = this.active || false;
        this.selected = this.selected || false;
    }
}
