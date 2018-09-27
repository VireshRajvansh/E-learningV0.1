import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    JobsManageComponent,
    JobsManageDetailComponent,
    JobsManageUpdateComponent,
    JobsManageDeletePopupComponent,
    JobsManageDeleteDialogComponent,
    jobsRoute,
    jobsPopupRoute
} from './';

const ENTITY_STATES = [...jobsRoute, ...jobsPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobsManageComponent,
        JobsManageDetailComponent,
        JobsManageUpdateComponent,
        JobsManageDeleteDialogComponent,
        JobsManageDeletePopupComponent
    ],
    entryComponents: [JobsManageComponent, JobsManageUpdateComponent, JobsManageDeleteDialogComponent, JobsManageDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningJobsManageModule {}
