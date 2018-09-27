import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StripeTransactionManage } from 'app/shared/model/stripe-transaction-manage.model';
import { StripeTransactionManageService } from './stripe-transaction-manage.service';
import { StripeTransactionManageComponent } from './stripe-transaction-manage.component';
import { StripeTransactionManageDetailComponent } from './stripe-transaction-manage-detail.component';
import { StripeTransactionManageUpdateComponent } from './stripe-transaction-manage-update.component';
import { StripeTransactionManageDeletePopupComponent } from './stripe-transaction-manage-delete-dialog.component';
import { IStripeTransactionManage } from 'app/shared/model/stripe-transaction-manage.model';

@Injectable({ providedIn: 'root' })
export class StripeTransactionManageResolve implements Resolve<IStripeTransactionManage> {
    constructor(private service: StripeTransactionManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((stripeTransaction: HttpResponse<StripeTransactionManage>) => stripeTransaction.body));
        }
        return of(new StripeTransactionManage());
    }
}

export const stripeTransactionRoute: Routes = [
    {
        path: 'stripe-transaction-manage',
        component: StripeTransactionManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.stripeTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stripe-transaction-manage/:id/view',
        component: StripeTransactionManageDetailComponent,
        resolve: {
            stripeTransaction: StripeTransactionManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stripe-transaction-manage/new',
        component: StripeTransactionManageUpdateComponent,
        resolve: {
            stripeTransaction: StripeTransactionManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stripe-transaction-manage/:id/edit',
        component: StripeTransactionManageUpdateComponent,
        resolve: {
            stripeTransaction: StripeTransactionManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stripeTransactionPopupRoute: Routes = [
    {
        path: 'stripe-transaction-manage/:id/delete',
        component: StripeTransactionManageDeletePopupComponent,
        resolve: {
            stripeTransaction: StripeTransactionManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
