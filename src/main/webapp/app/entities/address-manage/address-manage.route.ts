import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressManage } from 'app/shared/model/address-manage.model';
import { AddressManageService } from './address-manage.service';
import { AddressManageComponent } from './address-manage.component';
import { AddressManageDetailComponent } from './address-manage-detail.component';
import { AddressManageUpdateComponent } from './address-manage-update.component';
import { AddressManageDeletePopupComponent } from './address-manage-delete-dialog.component';
import { IAddressManage } from 'app/shared/model/address-manage.model';

@Injectable({ providedIn: 'root' })
export class AddressManageResolve implements Resolve<IAddressManage> {
    constructor(private service: AddressManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((address: HttpResponse<AddressManage>) => address.body));
        }
        return of(new AddressManage());
    }
}

export const addressRoute: Routes = [
    {
        path: 'address-manage',
        component: AddressManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-manage/:id/view',
        component: AddressManageDetailComponent,
        resolve: {
            address: AddressManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-manage/new',
        component: AddressManageUpdateComponent,
        resolve: {
            address: AddressManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-manage/:id/edit',
        component: AddressManageUpdateComponent,
        resolve: {
            address: AddressManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressPopupRoute: Routes = [
    {
        path: 'address-manage/:id/delete',
        component: AddressManageDeletePopupComponent,
        resolve: {
            address: AddressManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
