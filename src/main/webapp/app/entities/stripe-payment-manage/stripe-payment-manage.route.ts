import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StripePaymentManage } from 'app/shared/model/stripe-payment-manage.model';
import { StripePaymentManageService } from './stripe-payment-manage.service';
import { StripePaymentManageComponent } from './stripe-payment-manage.component';
import { StripePaymentManageDetailComponent } from './stripe-payment-manage-detail.component';
import { StripePaymentManageUpdateComponent } from './stripe-payment-manage-update.component';
import { StripePaymentManageDeletePopupComponent } from './stripe-payment-manage-delete-dialog.component';
import { IStripePaymentManage } from 'app/shared/model/stripe-payment-manage.model';

@Injectable({ providedIn: 'root' })
export class StripePaymentManageResolve implements Resolve<IStripePaymentManage> {
    constructor(private service: StripePaymentManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((stripePayment: HttpResponse<StripePaymentManage>) => stripePayment.body));
        }
        return of(new StripePaymentManage());
    }
}

export const stripePaymentRoute: Routes = [
    {
        path: 'stripe-payment-manage',
        component: StripePaymentManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.stripePayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stripe-payment-manage/:id/view',
        component: StripePaymentManageDetailComponent,
        resolve: {
            stripePayment: StripePaymentManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripePayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stripe-payment-manage/new',
        component: StripePaymentManageUpdateComponent,
        resolve: {
            stripePayment: StripePaymentManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripePayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stripe-payment-manage/:id/edit',
        component: StripePaymentManageUpdateComponent,
        resolve: {
            stripePayment: StripePaymentManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripePayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stripePaymentPopupRoute: Routes = [
    {
        path: 'stripe-payment-manage/:id/delete',
        component: StripePaymentManageDeletePopupComponent,
        resolve: {
            stripePayment: StripePaymentManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripePayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
