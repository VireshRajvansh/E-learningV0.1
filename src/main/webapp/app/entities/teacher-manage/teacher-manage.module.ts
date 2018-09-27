import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import { ELearningAdminModule } from 'app/admin/admin.module';
import {
    TeacherManageComponent,
    TeacherManageDetailComponent,
    TeacherManageUpdateComponent,
    TeacherManageDeletePopupComponent,
    TeacherManageDeleteDialogComponent,
    teacherRoute,
    teacherPopupRoute
} from './';

const ENTITY_STATES = [...teacherRoute, ...teacherPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, ELearningAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TeacherManageComponent,
        TeacherManageDetailComponent,
        TeacherManageUpdateComponent,
        TeacherManageDeleteDialogComponent,
        TeacherManageDeletePopupComponent
    ],
    entryComponents: [
        TeacherManageComponent,
        TeacherManageUpdateComponent,
        TeacherManageDeleteDialogComponent,
        TeacherManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningTeacherManageModule {}
