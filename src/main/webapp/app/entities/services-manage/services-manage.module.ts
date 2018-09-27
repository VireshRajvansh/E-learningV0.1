import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    ServicesManageComponent,
    ServicesManageDetailComponent,
    ServicesManageUpdateComponent,
    ServicesManageDeletePopupComponent,
    ServicesManageDeleteDialogComponent,
    servicesRoute,
    servicesPopupRoute
} from './';

const ENTITY_STATES = [...servicesRoute, ...servicesPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ServicesManageComponent,
        ServicesManageDetailComponent,
        ServicesManageUpdateComponent,
        ServicesManageDeleteDialogComponent,
        ServicesManageDeletePopupComponent
    ],
    entryComponents: [
        ServicesManageComponent,
        ServicesManageUpdateComponent,
        ServicesManageDeleteDialogComponent,
        ServicesManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningServicesManageModule {}
