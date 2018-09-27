import { IQuizManage } from 'app/shared/model//quiz-manage.model';

export interface IQuizAnsManage {
    id?: number;
    answers?: string;
    quiz?: IQuizManage;
}

export class QuizAnsManage implements IQuizAnsManage {
    constructor(public id?: number, public answers?: string, public quiz?: IQuizManage) {}
}
