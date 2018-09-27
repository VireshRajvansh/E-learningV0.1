import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuizManage } from 'app/shared/model/quiz-manage.model';
import { QuizManageService } from './quiz-manage.service';
import { QuizManageComponent } from './quiz-manage.component';
import { QuizManageDetailComponent } from './quiz-manage-detail.component';
import { QuizManageUpdateComponent } from './quiz-manage-update.component';
import { QuizManageDeletePopupComponent } from './quiz-manage-delete-dialog.component';
import { IQuizManage } from 'app/shared/model/quiz-manage.model';

@Injectable({ providedIn: 'root' })
export class QuizManageResolve implements Resolve<IQuizManage> {
    constructor(private service: QuizManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((quiz: HttpResponse<QuizManage>) => quiz.body));
        }
        return of(new QuizManage());
    }
}

export const quizRoute: Routes = [
    {
        path: 'quiz-manage',
        component: QuizManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-manage/:id/view',
        component: QuizManageDetailComponent,
        resolve: {
            quiz: QuizManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-manage/new',
        component: QuizManageUpdateComponent,
        resolve: {
            quiz: QuizManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-manage/:id/edit',
        component: QuizManageUpdateComponent,
        resolve: {
            quiz: QuizManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quizPopupRoute: Routes = [
    {
        path: 'quiz-manage/:id/delete',
        component: QuizManageDeletePopupComponent,
        resolve: {
            quiz: QuizManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
