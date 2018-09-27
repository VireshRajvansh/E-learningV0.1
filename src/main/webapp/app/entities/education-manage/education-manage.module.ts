import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    EducationManageComponent,
    EducationManageDetailComponent,
    EducationManageUpdateComponent,
    EducationManageDeletePopupComponent,
    EducationManageDeleteDialogComponent,
    educationRoute,
    educationPopupRoute
} from './';

const ENTITY_STATES = [...educationRoute, ...educationPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EducationManageComponent,
        EducationManageDetailComponent,
        EducationManageUpdateComponent,
        EducationManageDeleteDialogComponent,
        EducationManageDeletePopupComponent
    ],
    entryComponents: [
        EducationManageComponent,
        EducationManageUpdateComponent,
        EducationManageDeleteDialogComponent,
        EducationManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningEducationManageModule {}
