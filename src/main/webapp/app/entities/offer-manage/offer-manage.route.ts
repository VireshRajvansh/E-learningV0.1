import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OfferManage } from 'app/shared/model/offer-manage.model';
import { OfferManageService } from './offer-manage.service';
import { OfferManageComponent } from './offer-manage.component';
import { OfferManageDetailComponent } from './offer-manage-detail.component';
import { OfferManageUpdateComponent } from './offer-manage-update.component';
import { OfferManageDeletePopupComponent } from './offer-manage-delete-dialog.component';
import { IOfferManage } from 'app/shared/model/offer-manage.model';

@Injectable({ providedIn: 'root' })
export class OfferManageResolve implements Resolve<IOfferManage> {
    constructor(private service: OfferManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((offer: HttpResponse<OfferManage>) => offer.body));
        }
        return of(new OfferManage());
    }
}

export const offerRoute: Routes = [
    {
        path: 'offer-manage',
        component: OfferManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.offer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'offer-manage/:id/view',
        component: OfferManageDetailComponent,
        resolve: {
            offer: OfferManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.offer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'offer-manage/new',
        component: OfferManageUpdateComponent,
        resolve: {
            offer: OfferManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.offer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'offer-manage/:id/edit',
        component: OfferManageUpdateComponent,
        resolve: {
            offer: OfferManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.offer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const offerPopupRoute: Routes = [
    {
        path: 'offer-manage/:id/delete',
        component: OfferManageDeletePopupComponent,
        resolve: {
            offer: OfferManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.offer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
