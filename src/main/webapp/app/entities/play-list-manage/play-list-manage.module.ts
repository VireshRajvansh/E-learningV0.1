import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    PlayListManageComponent,
    PlayListManageDetailComponent,
    PlayListManageUpdateComponent,
    PlayListManageDeletePopupComponent,
    PlayListManageDeleteDialogComponent,
    playListRoute,
    playListPopupRoute
} from './';

const ENTITY_STATES = [...playListRoute, ...playListPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PlayListManageComponent,
        PlayListManageDetailComponent,
        PlayListManageUpdateComponent,
        PlayListManageDeleteDialogComponent,
        PlayListManageDeletePopupComponent
    ],
    entryComponents: [
        PlayListManageComponent,
        PlayListManageUpdateComponent,
        PlayListManageDeleteDialogComponent,
        PlayListManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningPlayListManageModule {}
