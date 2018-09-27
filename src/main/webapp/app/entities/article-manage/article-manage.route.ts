import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleManage } from 'app/shared/model/article-manage.model';
import { ArticleManageService } from './article-manage.service';
import { ArticleManageComponent } from './article-manage.component';
import { ArticleManageDetailComponent } from './article-manage-detail.component';
import { ArticleManageUpdateComponent } from './article-manage-update.component';
import { ArticleManageDeletePopupComponent } from './article-manage-delete-dialog.component';
import { IArticleManage } from 'app/shared/model/article-manage.model';

@Injectable({ providedIn: 'root' })
export class ArticleManageResolve implements Resolve<IArticleManage> {
    constructor(private service: ArticleManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((article: HttpResponse<ArticleManage>) => article.body));
        }
        return of(new ArticleManage());
    }
}

export const articleRoute: Routes = [
    {
        path: 'article-manage',
        component: ArticleManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.article.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article-manage/:id/view',
        component: ArticleManageDetailComponent,
        resolve: {
            article: ArticleManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.article.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article-manage/new',
        component: ArticleManageUpdateComponent,
        resolve: {
            article: ArticleManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.article.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article-manage/:id/edit',
        component: ArticleManageUpdateComponent,
        resolve: {
            article: ArticleManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.article.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const articlePopupRoute: Routes = [
    {
        path: 'article-manage/:id/delete',
        component: ArticleManageDeletePopupComponent,
        resolve: {
            article: ArticleManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.article.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
