import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuizAnsManage } from 'app/shared/model/quiz-ans-manage.model';

@Component({
    selector: 'jhi-quiz-ans-manage-detail',
    templateUrl: './quiz-ans-manage-detail.component.html'
})
export class QuizAnsManageDetailComponent implements OnInit {
    quizAns: IQuizAnsManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ quizAns }) => {
            this.quizAns = quizAns;
        });
    }

    previousState() {
        window.history.back();
    }
}
