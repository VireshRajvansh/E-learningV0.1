import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuizAnsManage } from 'app/shared/model/quiz-ans-manage.model';
import { QuizAnsManageService } from './quiz-ans-manage.service';
import { QuizAnsManageComponent } from './quiz-ans-manage.component';
import { QuizAnsManageDetailComponent } from './quiz-ans-manage-detail.component';
import { QuizAnsManageUpdateComponent } from './quiz-ans-manage-update.component';
import { QuizAnsManageDeletePopupComponent } from './quiz-ans-manage-delete-dialog.component';
import { IQuizAnsManage } from 'app/shared/model/quiz-ans-manage.model';

@Injectable({ providedIn: 'root' })
export class QuizAnsManageResolve implements Resolve<IQuizAnsManage> {
    constructor(private service: QuizAnsManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((quizAns: HttpResponse<QuizAnsManage>) => quizAns.body));
        }
        return of(new QuizAnsManage());
    }
}

export const quizAnsRoute: Routes = [
    {
        path: 'quiz-ans-manage',
        component: QuizAnsManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.quizAns.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-ans-manage/:id/view',
        component: QuizAnsManageDetailComponent,
        resolve: {
            quizAns: QuizAnsManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quizAns.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-ans-manage/new',
        component: QuizAnsManageUpdateComponent,
        resolve: {
            quizAns: QuizAnsManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quizAns.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-ans-manage/:id/edit',
        component: QuizAnsManageUpdateComponent,
        resolve: {
            quizAns: QuizAnsManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quizAns.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quizAnsPopupRoute: Routes = [
    {
        path: 'quiz-ans-manage/:id/delete',
        component: QuizAnsManageDeletePopupComponent,
        resolve: {
            quizAns: QuizAnsManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quizAns.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
