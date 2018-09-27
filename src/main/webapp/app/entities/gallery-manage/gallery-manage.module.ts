import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    GalleryManageComponent,
    GalleryManageDetailComponent,
    GalleryManageUpdateComponent,
    GalleryManageDeletePopupComponent,
    GalleryManageDeleteDialogComponent,
    galleryRoute,
    galleryPopupRoute
} from './';

const ENTITY_STATES = [...galleryRoute, ...galleryPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GalleryManageComponent,
        GalleryManageDetailComponent,
        GalleryManageUpdateComponent,
        GalleryManageDeleteDialogComponent,
        GalleryManageDeletePopupComponent
    ],
    entryComponents: [
        GalleryManageComponent,
        GalleryManageUpdateComponent,
        GalleryManageDeleteDialogComponent,
        GalleryManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningGalleryManageModule {}
