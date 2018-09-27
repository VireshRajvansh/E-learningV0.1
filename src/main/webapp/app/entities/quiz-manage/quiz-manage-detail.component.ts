import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuizManage } from 'app/shared/model/quiz-manage.model';

@Component({
    selector: 'jhi-quiz-manage-detail',
    templateUrl: './quiz-manage-detail.component.html'
})
export class QuizManageDetailComponent implements OnInit {
    quiz: IQuizManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ quiz }) => {
            this.quiz = quiz;
        });
    }

    previousState() {
        window.history.back();
    }
}
