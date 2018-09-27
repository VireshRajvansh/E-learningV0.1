import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EducationManage } from 'app/shared/model/education-manage.model';
import { EducationManageService } from './education-manage.service';
import { EducationManageComponent } from './education-manage.component';
import { EducationManageDetailComponent } from './education-manage-detail.component';
import { EducationManageUpdateComponent } from './education-manage-update.component';
import { EducationManageDeletePopupComponent } from './education-manage-delete-dialog.component';
import { IEducationManage } from 'app/shared/model/education-manage.model';

@Injectable({ providedIn: 'root' })
export class EducationManageResolve implements Resolve<IEducationManage> {
    constructor(private service: EducationManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((education: HttpResponse<EducationManage>) => education.body));
        }
        return of(new EducationManage());
    }
}

export const educationRoute: Routes = [
    {
        path: 'education-manage',
        component: EducationManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.education.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'education-manage/:id/view',
        component: EducationManageDetailComponent,
        resolve: {
            education: EducationManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.education.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'education-manage/new',
        component: EducationManageUpdateComponent,
        resolve: {
            education: EducationManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.education.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'education-manage/:id/edit',
        component: EducationManageUpdateComponent,
        resolve: {
            education: EducationManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.education.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const educationPopupRoute: Routes = [
    {
        path: 'education-manage/:id/delete',
        component: EducationManageDeletePopupComponent,
        resolve: {
            education: EducationManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.education.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
