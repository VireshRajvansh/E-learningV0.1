import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserSignUpByReferralCodeManage } from 'app/shared/model/user-sign-up-by-referral-code-manage.model';
import { UserSignUpByReferralCodeManageService } from './user-sign-up-by-referral-code-manage.service';
import { UserSignUpByReferralCodeManageComponent } from './user-sign-up-by-referral-code-manage.component';
import { UserSignUpByReferralCodeManageDetailComponent } from './user-sign-up-by-referral-code-manage-detail.component';
import { UserSignUpByReferralCodeManageUpdateComponent } from './user-sign-up-by-referral-code-manage-update.component';
import { UserSignUpByReferralCodeManageDeletePopupComponent } from './user-sign-up-by-referral-code-manage-delete-dialog.component';
import { IUserSignUpByReferralCodeManage } from 'app/shared/model/user-sign-up-by-referral-code-manage.model';

@Injectable({ providedIn: 'root' })
export class UserSignUpByReferralCodeManageResolve implements Resolve<IUserSignUpByReferralCodeManage> {
    constructor(private service: UserSignUpByReferralCodeManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((userSignUpByReferralCode: HttpResponse<UserSignUpByReferralCodeManage>) => userSignUpByReferralCode.body));
        }
        return of(new UserSignUpByReferralCodeManage());
    }
}

export const userSignUpByReferralCodeRoute: Routes = [
    {
        path: 'user-sign-up-by-referral-code-manage',
        component: UserSignUpByReferralCodeManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.userSignUpByReferralCode.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-sign-up-by-referral-code-manage/:id/view',
        component: UserSignUpByReferralCodeManageDetailComponent,
        resolve: {
            userSignUpByReferralCode: UserSignUpByReferralCodeManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.userSignUpByReferralCode.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-sign-up-by-referral-code-manage/new',
        component: UserSignUpByReferralCodeManageUpdateComponent,
        resolve: {
            userSignUpByReferralCode: UserSignUpByReferralCodeManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.userSignUpByReferralCode.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-sign-up-by-referral-code-manage/:id/edit',
        component: UserSignUpByReferralCodeManageUpdateComponent,
        resolve: {
            userSignUpByReferralCode: UserSignUpByReferralCodeManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.userSignUpByReferralCode.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userSignUpByReferralCodePopupRoute: Routes = [
    {
        path: 'user-sign-up-by-referral-code-manage/:id/delete',
        component: UserSignUpByReferralCodeManageDeletePopupComponent,
        resolve: {
            userSignUpByReferralCode: UserSignUpByReferralCodeManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.userSignUpByReferralCode.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
