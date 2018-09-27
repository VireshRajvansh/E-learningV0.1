import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IQuizAnsManage } from 'app/shared/model/quiz-ans-manage.model';
import { QuizAnsManageService } from './quiz-ans-manage.service';
import { IQuizManage } from 'app/shared/model/quiz-manage.model';
import { QuizManageService } from 'app/entities/quiz-manage';

@Component({
    selector: 'jhi-quiz-ans-manage-update',
    templateUrl: './quiz-ans-manage-update.component.html'
})
export class QuizAnsManageUpdateComponent implements OnInit {
    private _quizAns: IQuizAnsManage;
    isSaving: boolean;

    quizzes: IQuizManage[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private quizAnsService: QuizAnsManageService,
        private quizService: QuizManageService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ quizAns }) => {
            this.quizAns = quizAns;
        });
        this.quizService.query().subscribe(
            (res: HttpResponse<IQuizManage[]>) => {
                this.quizzes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.quizAns.id !== undefined) {
            this.subscribeToSaveResponse(this.quizAnsService.update(this.quizAns));
        } else {
            this.subscribeToSaveResponse(this.quizAnsService.create(this.quizAns));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQuizAnsManage>>) {
        result.subscribe((res: HttpResponse<IQuizAnsManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackQuizById(index: number, item: IQuizManage) {
        return item.id;
    }
    get quizAns() {
        return this._quizAns;
    }

    set quizAns(quizAns: IQuizAnsManage) {
        this._quizAns = quizAns;
    }
}
