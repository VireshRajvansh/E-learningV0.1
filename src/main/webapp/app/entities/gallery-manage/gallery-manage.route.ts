import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GalleryManage } from 'app/shared/model/gallery-manage.model';
import { GalleryManageService } from './gallery-manage.service';
import { GalleryManageComponent } from './gallery-manage.component';
import { GalleryManageDetailComponent } from './gallery-manage-detail.component';
import { GalleryManageUpdateComponent } from './gallery-manage-update.component';
import { GalleryManageDeletePopupComponent } from './gallery-manage-delete-dialog.component';
import { IGalleryManage } from 'app/shared/model/gallery-manage.model';

@Injectable({ providedIn: 'root' })
export class GalleryManageResolve implements Resolve<IGalleryManage> {
    constructor(private service: GalleryManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((gallery: HttpResponse<GalleryManage>) => gallery.body));
        }
        return of(new GalleryManage());
    }
}

export const galleryRoute: Routes = [
    {
        path: 'gallery-manage',
        component: GalleryManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.gallery.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gallery-manage/:id/view',
        component: GalleryManageDetailComponent,
        resolve: {
            gallery: GalleryManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.gallery.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gallery-manage/new',
        component: GalleryManageUpdateComponent,
        resolve: {
            gallery: GalleryManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.gallery.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gallery-manage/:id/edit',
        component: GalleryManageUpdateComponent,
        resolve: {
            gallery: GalleryManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.gallery.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const galleryPopupRoute: Routes = [
    {
        path: 'gallery-manage/:id/delete',
        component: GalleryManageDeletePopupComponent,
        resolve: {
            gallery: GalleryManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.gallery.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
