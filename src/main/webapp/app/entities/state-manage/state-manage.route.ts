import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateManage } from 'app/shared/model/state-manage.model';
import { StateManageService } from './state-manage.service';
import { StateManageComponent } from './state-manage.component';
import { StateManageDetailComponent } from './state-manage-detail.component';
import { StateManageUpdateComponent } from './state-manage-update.component';
import { StateManageDeletePopupComponent } from './state-manage-delete-dialog.component';
import { IStateManage } from 'app/shared/model/state-manage.model';

@Injectable({ providedIn: 'root' })
export class StateManageResolve implements Resolve<IStateManage> {
    constructor(private service: StateManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((state: HttpResponse<StateManage>) => state.body));
        }
        return of(new StateManage());
    }
}

export const stateRoute: Routes = [
    {
        path: 'state-manage',
        component: StateManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.state.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'state-manage/:id/view',
        component: StateManageDetailComponent,
        resolve: {
            state: StateManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.state.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'state-manage/new',
        component: StateManageUpdateComponent,
        resolve: {
            state: StateManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.state.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'state-manage/:id/edit',
        component: StateManageUpdateComponent,
        resolve: {
            state: StateManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.state.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const statePopupRoute: Routes = [
    {
        path: 'state-manage/:id/delete',
        component: StateManageDeletePopupComponent,
        resolve: {
            state: StateManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.state.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
