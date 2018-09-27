import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentManage } from 'app/shared/model/student-manage.model';
import { StudentManageService } from './student-manage.service';
import { StudentManageComponent } from './student-manage.component';
import { StudentManageDetailComponent } from './student-manage-detail.component';
import { StudentManageUpdateComponent } from './student-manage-update.component';
import { StudentManageDeletePopupComponent } from './student-manage-delete-dialog.component';
import { IStudentManage } from 'app/shared/model/student-manage.model';

@Injectable({ providedIn: 'root' })
export class StudentManageResolve implements Resolve<IStudentManage> {
    constructor(private service: StudentManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((student: HttpResponse<StudentManage>) => student.body));
        }
        return of(new StudentManage());
    }
}

export const studentRoute: Routes = [
    {
        path: 'student-manage',
        component: StudentManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-manage/:id/view',
        component: StudentManageDetailComponent,
        resolve: {
            student: StudentManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-manage/new',
        component: StudentManageUpdateComponent,
        resolve: {
            student: StudentManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-manage/:id/edit',
        component: StudentManageUpdateComponent,
        resolve: {
            student: StudentManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentPopupRoute: Routes = [
    {
        path: 'student-manage/:id/delete',
        component: StudentManageDeletePopupComponent,
        resolve: {
            student: StudentManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
