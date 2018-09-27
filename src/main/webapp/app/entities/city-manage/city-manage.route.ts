import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CityManage } from 'app/shared/model/city-manage.model';
import { CityManageService } from './city-manage.service';
import { CityManageComponent } from './city-manage.component';
import { CityManageDetailComponent } from './city-manage-detail.component';
import { CityManageUpdateComponent } from './city-manage-update.component';
import { CityManageDeletePopupComponent } from './city-manage-delete-dialog.component';
import { ICityManage } from 'app/shared/model/city-manage.model';

@Injectable({ providedIn: 'root' })
export class CityManageResolve implements Resolve<ICityManage> {
    constructor(private service: CityManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((city: HttpResponse<CityManage>) => city.body));
        }
        return of(new CityManage());
    }
}

export const cityRoute: Routes = [
    {
        path: 'city-manage',
        component: CityManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.city.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'city-manage/:id/view',
        component: CityManageDetailComponent,
        resolve: {
            city: CityManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.city.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'city-manage/new',
        component: CityManageUpdateComponent,
        resolve: {
            city: CityManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.city.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'city-manage/:id/edit',
        component: CityManageUpdateComponent,
        resolve: {
            city: CityManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.city.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cityPopupRoute: Routes = [
    {
        path: 'city-manage/:id/delete',
        component: CityManageDeletePopupComponent,
        resolve: {
            city: CityManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.city.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
