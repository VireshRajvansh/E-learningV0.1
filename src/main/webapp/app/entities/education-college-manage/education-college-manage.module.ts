import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    EducationCollegeManageComponent,
    EducationCollegeManageDetailComponent,
    EducationCollegeManageUpdateComponent,
    EducationCollegeManageDeletePopupComponent,
    EducationCollegeManageDeleteDialogComponent,
    educationCollegeRoute,
    educationCollegePopupRoute
} from './';

const ENTITY_STATES = [...educationCollegeRoute, ...educationCollegePopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EducationCollegeManageComponent,
        EducationCollegeManageDetailComponent,
        EducationCollegeManageUpdateComponent,
        EducationCollegeManageDeleteDialogComponent,
        EducationCollegeManageDeletePopupComponent
    ],
    entryComponents: [
        EducationCollegeManageComponent,
        EducationCollegeManageUpdateComponent,
        EducationCollegeManageDeleteDialogComponent,
        EducationCollegeManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningEducationCollegeManageModule {}
