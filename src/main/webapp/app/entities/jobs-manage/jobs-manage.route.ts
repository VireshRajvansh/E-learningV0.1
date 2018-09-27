import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobsManage } from 'app/shared/model/jobs-manage.model';
import { JobsManageService } from './jobs-manage.service';
import { JobsManageComponent } from './jobs-manage.component';
import { JobsManageDetailComponent } from './jobs-manage-detail.component';
import { JobsManageUpdateComponent } from './jobs-manage-update.component';
import { JobsManageDeletePopupComponent } from './jobs-manage-delete-dialog.component';
import { IJobsManage } from 'app/shared/model/jobs-manage.model';

@Injectable({ providedIn: 'root' })
export class JobsManageResolve implements Resolve<IJobsManage> {
    constructor(private service: JobsManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((jobs: HttpResponse<JobsManage>) => jobs.body));
        }
        return of(new JobsManage());
    }
}

export const jobsRoute: Routes = [
    {
        path: 'jobs-manage',
        component: JobsManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.jobs.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jobs-manage/:id/view',
        component: JobsManageDetailComponent,
        resolve: {
            jobs: JobsManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.jobs.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jobs-manage/new',
        component: JobsManageUpdateComponent,
        resolve: {
            jobs: JobsManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.jobs.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jobs-manage/:id/edit',
        component: JobsManageUpdateComponent,
        resolve: {
            jobs: JobsManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.jobs.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobsPopupRoute: Routes = [
    {
        path: 'jobs-manage/:id/delete',
        component: JobsManageDeletePopupComponent,
        resolve: {
            jobs: JobsManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.jobs.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
