import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IQuizManage } from 'app/shared/model/quiz-manage.model';
import { QuizManageService } from './quiz-manage.service';
import { IQuizAnsManage } from 'app/shared/model/quiz-ans-manage.model';
import { QuizAnsManageService } from 'app/entities/quiz-ans-manage';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-quiz-manage-update',
    templateUrl: './quiz-manage-update.component.html'
})
export class QuizManageUpdateComponent implements OnInit {
    private _quiz: IQuizManage;
    isSaving: boolean;

    quizans: IQuizAnsManage[];

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private quizService: QuizManageService,
        private quizAnsService: QuizAnsManageService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ quiz }) => {
            this.quiz = quiz;
        });
        this.quizAnsService.query({ filter: 'quiz-is-null' }).subscribe(
            (res: HttpResponse<IQuizAnsManage[]>) => {
                if (!this.quiz.quizAns || !this.quiz.quizAns.id) {
                    this.quizans = res.body;
                } else {
                    this.quizAnsService.find(this.quiz.quizAns.id).subscribe(
                        (subRes: HttpResponse<IQuizAnsManage>) => {
                            this.quizans = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.quiz.id !== undefined) {
            this.subscribeToSaveResponse(this.quizService.update(this.quiz));
        } else {
            this.subscribeToSaveResponse(this.quizService.create(this.quiz));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQuizManage>>) {
        result.subscribe((res: HttpResponse<IQuizManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackQuizAnsById(index: number, item: IQuizAnsManage) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get quiz() {
        return this._quiz;
    }

    set quiz(quiz: IQuizManage) {
        this._quiz = quiz;
    }
}
