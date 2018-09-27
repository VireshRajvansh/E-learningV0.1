import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaxRateManage } from 'app/shared/model/tax-rate-manage.model';
import { TaxRateManageService } from './tax-rate-manage.service';
import { TaxRateManageComponent } from './tax-rate-manage.component';
import { TaxRateManageDetailComponent } from './tax-rate-manage-detail.component';
import { TaxRateManageUpdateComponent } from './tax-rate-manage-update.component';
import { TaxRateManageDeletePopupComponent } from './tax-rate-manage-delete-dialog.component';
import { ITaxRateManage } from 'app/shared/model/tax-rate-manage.model';

@Injectable({ providedIn: 'root' })
export class TaxRateManageResolve implements Resolve<ITaxRateManage> {
    constructor(private service: TaxRateManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((taxRate: HttpResponse<TaxRateManage>) => taxRate.body));
        }
        return of(new TaxRateManage());
    }
}

export const taxRateRoute: Routes = [
    {
        path: 'tax-rate-manage',
        component: TaxRateManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.taxRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tax-rate-manage/:id/view',
        component: TaxRateManageDetailComponent,
        resolve: {
            taxRate: TaxRateManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.taxRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tax-rate-manage/new',
        component: TaxRateManageUpdateComponent,
        resolve: {
            taxRate: TaxRateManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.taxRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tax-rate-manage/:id/edit',
        component: TaxRateManageUpdateComponent,
        resolve: {
            taxRate: TaxRateManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.taxRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taxRatePopupRoute: Routes = [
    {
        path: 'tax-rate-manage/:id/delete',
        component: TaxRateManageDeletePopupComponent,
        resolve: {
            taxRate: TaxRateManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.taxRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
