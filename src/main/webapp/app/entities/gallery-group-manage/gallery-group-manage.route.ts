import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GalleryGroupManage } from 'app/shared/model/gallery-group-manage.model';
import { GalleryGroupManageService } from './gallery-group-manage.service';
import { GalleryGroupManageComponent } from './gallery-group-manage.component';
import { GalleryGroupManageDetailComponent } from './gallery-group-manage-detail.component';
import { GalleryGroupManageUpdateComponent } from './gallery-group-manage-update.component';
import { GalleryGroupManageDeletePopupComponent } from './gallery-group-manage-delete-dialog.component';
import { IGalleryGroupManage } from 'app/shared/model/gallery-group-manage.model';

@Injectable({ providedIn: 'root' })
export class GalleryGroupManageResolve implements Resolve<IGalleryGroupManage> {
    constructor(private service: GalleryGroupManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((galleryGroup: HttpResponse<GalleryGroupManage>) => galleryGroup.body));
        }
        return of(new GalleryGroupManage());
    }
}

export const galleryGroupRoute: Routes = [
    {
        path: 'gallery-group-manage',
        component: GalleryGroupManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.galleryGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gallery-group-manage/:id/view',
        component: GalleryGroupManageDetailComponent,
        resolve: {
            galleryGroup: GalleryGroupManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.galleryGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gallery-group-manage/new',
        component: GalleryGroupManageUpdateComponent,
        resolve: {
            galleryGroup: GalleryGroupManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.galleryGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gallery-group-manage/:id/edit',
        component: GalleryGroupManageUpdateComponent,
        resolve: {
            galleryGroup: GalleryGroupManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.galleryGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const galleryGroupPopupRoute: Routes = [
    {
        path: 'gallery-group-manage/:id/delete',
        component: GalleryGroupManageDeletePopupComponent,
        resolve: {
            galleryGroup: GalleryGroupManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.galleryGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
