import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayListManage } from 'app/shared/model/play-list-manage.model';
import { PlayListManageService } from './play-list-manage.service';
import { PlayListManageComponent } from './play-list-manage.component';
import { PlayListManageDetailComponent } from './play-list-manage-detail.component';
import { PlayListManageUpdateComponent } from './play-list-manage-update.component';
import { PlayListManageDeletePopupComponent } from './play-list-manage-delete-dialog.component';
import { IPlayListManage } from 'app/shared/model/play-list-manage.model';

@Injectable({ providedIn: 'root' })
export class PlayListManageResolve implements Resolve<IPlayListManage> {
    constructor(private service: PlayListManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((playList: HttpResponse<PlayListManage>) => playList.body));
        }
        return of(new PlayListManage());
    }
}

export const playListRoute: Routes = [
    {
        path: 'play-list-manage',
        component: PlayListManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.playList.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'play-list-manage/:id/view',
        component: PlayListManageDetailComponent,
        resolve: {
            playList: PlayListManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.playList.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'play-list-manage/new',
        component: PlayListManageUpdateComponent,
        resolve: {
            playList: PlayListManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.playList.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'play-list-manage/:id/edit',
        component: PlayListManageUpdateComponent,
        resolve: {
            playList: PlayListManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.playList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const playListPopupRoute: Routes = [
    {
        path: 'play-list-manage/:id/delete',
        component: PlayListManageDeletePopupComponent,
        resolve: {
            playList: PlayListManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.playList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
