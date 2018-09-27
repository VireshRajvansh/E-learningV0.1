import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EducationCollegeManage } from 'app/shared/model/education-college-manage.model';
import { EducationCollegeManageService } from './education-college-manage.service';
import { EducationCollegeManageComponent } from './education-college-manage.component';
import { EducationCollegeManageDetailComponent } from './education-college-manage-detail.component';
import { EducationCollegeManageUpdateComponent } from './education-college-manage-update.component';
import { EducationCollegeManageDeletePopupComponent } from './education-college-manage-delete-dialog.component';
import { IEducationCollegeManage } from 'app/shared/model/education-college-manage.model';

@Injectable({ providedIn: 'root' })
export class EducationCollegeManageResolve implements Resolve<IEducationCollegeManage> {
    constructor(private service: EducationCollegeManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((educationCollege: HttpResponse<EducationCollegeManage>) => educationCollege.body));
        }
        return of(new EducationCollegeManage());
    }
}

export const educationCollegeRoute: Routes = [
    {
        path: 'education-college-manage',
        component: EducationCollegeManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.educationCollege.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'education-college-manage/:id/view',
        component: EducationCollegeManageDetailComponent,
        resolve: {
            educationCollege: EducationCollegeManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.educationCollege.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'education-college-manage/new',
        component: EducationCollegeManageUpdateComponent,
        resolve: {
            educationCollege: EducationCollegeManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.educationCollege.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'education-college-manage/:id/edit',
        component: EducationCollegeManageUpdateComponent,
        resolve: {
            educationCollege: EducationCollegeManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.educationCollege.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const educationCollegePopupRoute: Routes = [
    {
        path: 'education-college-manage/:id/delete',
        component: EducationCollegeManageDeletePopupComponent,
        resolve: {
            educationCollege: EducationCollegeManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.educationCollege.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
