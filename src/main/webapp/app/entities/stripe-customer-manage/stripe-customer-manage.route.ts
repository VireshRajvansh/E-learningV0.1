import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StripeCustomerManage } from 'app/shared/model/stripe-customer-manage.model';
import { StripeCustomerManageService } from './stripe-customer-manage.service';
import { StripeCustomerManageComponent } from './stripe-customer-manage.component';
import { StripeCustomerManageDetailComponent } from './stripe-customer-manage-detail.component';
import { StripeCustomerManageUpdateComponent } from './stripe-customer-manage-update.component';
import { StripeCustomerManageDeletePopupComponent } from './stripe-customer-manage-delete-dialog.component';
import { IStripeCustomerManage } from 'app/shared/model/stripe-customer-manage.model';

@Injectable({ providedIn: 'root' })
export class StripeCustomerManageResolve implements Resolve<IStripeCustomerManage> {
    constructor(private service: StripeCustomerManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((stripeCustomer: HttpResponse<StripeCustomerManage>) => stripeCustomer.body));
        }
        return of(new StripeCustomerManage());
    }
}

export const stripeCustomerRoute: Routes = [
    {
        path: 'stripe-customer-manage',
        component: StripeCustomerManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.stripeCustomer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stripe-customer-manage/:id/view',
        component: StripeCustomerManageDetailComponent,
        resolve: {
            stripeCustomer: StripeCustomerManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeCustomer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stripe-customer-manage/new',
        component: StripeCustomerManageUpdateComponent,
        resolve: {
            stripeCustomer: StripeCustomerManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeCustomer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stripe-customer-manage/:id/edit',
        component: StripeCustomerManageUpdateComponent,
        resolve: {
            stripeCustomer: StripeCustomerManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeCustomer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stripeCustomerPopupRoute: Routes = [
    {
        path: 'stripe-customer-manage/:id/delete',
        component: StripeCustomerManageDeletePopupComponent,
        resolve: {
            stripeCustomer: StripeCustomerManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeCustomer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
