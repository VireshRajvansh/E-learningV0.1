import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseManage } from 'app/shared/model/course-manage.model';
import { CourseManageService } from './course-manage.service';
import { CourseManageComponent } from './course-manage.component';
import { CourseManageDetailComponent } from './course-manage-detail.component';
import { CourseManageUpdateComponent } from './course-manage-update.component';
import { CourseManageDeletePopupComponent } from './course-manage-delete-dialog.component';
import { ICourseManage } from 'app/shared/model/course-manage.model';

@Injectable({ providedIn: 'root' })
export class CourseManageResolve implements Resolve<ICourseManage> {
    constructor(private service: CourseManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((course: HttpResponse<CourseManage>) => course.body));
        }
        return of(new CourseManage());
    }
}

export const courseRoute: Routes = [
    {
        path: 'course-manage',
        component: CourseManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'course-manage/:id/view',
        component: CourseManageDetailComponent,
        resolve: {
            course: CourseManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'course-manage/new',
        component: CourseManageUpdateComponent,
        resolve: {
            course: CourseManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'course-manage/:id/edit',
        component: CourseManageUpdateComponent,
        resolve: {
            course: CourseManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const coursePopupRoute: Routes = [
    {
        path: 'course-manage/:id/delete',
        component: CourseManageDeletePopupComponent,
        resolve: {
            course: CourseManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.course.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
