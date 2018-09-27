import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeacherManage } from 'app/shared/model/teacher-manage.model';
import { TeacherManageService } from './teacher-manage.service';
import { TeacherManageComponent } from './teacher-manage.component';
import { TeacherManageDetailComponent } from './teacher-manage-detail.component';
import { TeacherManageUpdateComponent } from './teacher-manage-update.component';
import { TeacherManageDeletePopupComponent } from './teacher-manage-delete-dialog.component';
import { ITeacherManage } from 'app/shared/model/teacher-manage.model';

@Injectable({ providedIn: 'root' })
export class TeacherManageResolve implements Resolve<ITeacherManage> {
    constructor(private service: TeacherManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((teacher: HttpResponse<TeacherManage>) => teacher.body));
        }
        return of(new TeacherManage());
    }
}

export const teacherRoute: Routes = [
    {
        path: 'teacher-manage',
        component: TeacherManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teacher-manage/:id/view',
        component: TeacherManageDetailComponent,
        resolve: {
            teacher: TeacherManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teacher-manage/new',
        component: TeacherManageUpdateComponent,
        resolve: {
            teacher: TeacherManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teacher-manage/:id/edit',
        component: TeacherManageUpdateComponent,
        resolve: {
            teacher: TeacherManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teacherPopupRoute: Routes = [
    {
        path: 'teacher-manage/:id/delete',
        component: TeacherManageDeletePopupComponent,
        resolve: {
            teacher: TeacherManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
