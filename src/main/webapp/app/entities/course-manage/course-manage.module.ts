import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import { ELearningAdminModule } from 'app/admin/admin.module';
import {
    CourseManageComponent,
    CourseManageDetailComponent,
    CourseManageUpdateComponent,
    CourseManageDeletePopupComponent,
    CourseManageDeleteDialogComponent,
    courseRoute,
    coursePopupRoute
} from './';

const ENTITY_STATES = [...courseRoute, ...coursePopupRoute];

@NgModule({
    imports: [ELearningSharedModule, ELearningAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CourseManageComponent,
        CourseManageDetailComponent,
        CourseManageUpdateComponent,
        CourseManageDeleteDialogComponent,
        CourseManageDeletePopupComponent
    ],
    entryComponents: [
        CourseManageComponent,
        CourseManageUpdateComponent,
        CourseManageDeleteDialogComponent,
        CourseManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningCourseManageModule {}
