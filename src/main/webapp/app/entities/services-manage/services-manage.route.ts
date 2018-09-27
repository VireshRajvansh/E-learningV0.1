import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicesManage } from 'app/shared/model/services-manage.model';
import { ServicesManageService } from './services-manage.service';
import { ServicesManageComponent } from './services-manage.component';
import { ServicesManageDetailComponent } from './services-manage-detail.component';
import { ServicesManageUpdateComponent } from './services-manage-update.component';
import { ServicesManageDeletePopupComponent } from './services-manage-delete-dialog.component';
import { IServicesManage } from 'app/shared/model/services-manage.model';

@Injectable({ providedIn: 'root' })
export class ServicesManageResolve implements Resolve<IServicesManage> {
    constructor(private service: ServicesManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((services: HttpResponse<ServicesManage>) => services.body));
        }
        return of(new ServicesManage());
    }
}

export const servicesRoute: Routes = [
    {
        path: 'services-manage',
        component: ServicesManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'services-manage/:id/view',
        component: ServicesManageDetailComponent,
        resolve: {
            services: ServicesManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'services-manage/new',
        component: ServicesManageUpdateComponent,
        resolve: {
            services: ServicesManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'services-manage/:id/edit',
        component: ServicesManageUpdateComponent,
        resolve: {
            services: ServicesManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servicesPopupRoute: Routes = [
    {
        path: 'services-manage/:id/delete',
        component: ServicesManageDeletePopupComponent,
        resolve: {
            services: ServicesManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.services.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
