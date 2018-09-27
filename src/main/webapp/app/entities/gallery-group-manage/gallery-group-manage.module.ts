import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    GalleryGroupManageComponent,
    GalleryGroupManageDetailComponent,
    GalleryGroupManageUpdateComponent,
    GalleryGroupManageDeletePopupComponent,
    GalleryGroupManageDeleteDialogComponent,
    galleryGroupRoute,
    galleryGroupPopupRoute
} from './';

const ENTITY_STATES = [...galleryGroupRoute, ...galleryGroupPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GalleryGroupManageComponent,
        GalleryGroupManageDetailComponent,
        GalleryGroupManageUpdateComponent,
        GalleryGroupManageDeleteDialogComponent,
        GalleryGroupManageDeletePopupComponent
    ],
    entryComponents: [
        GalleryGroupManageComponent,
        GalleryGroupManageUpdateComponent,
        GalleryGroupManageDeleteDialogComponent,
        GalleryGroupManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningGalleryGroupManageModule {}
