import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import { ELearningAdminModule } from 'app/admin/admin.module';
import {
    StudentManageComponent,
    StudentManageDetailComponent,
    StudentManageUpdateComponent,
    StudentManageDeletePopupComponent,
    StudentManageDeleteDialogComponent,
    studentRoute,
    studentPopupRoute
} from './';

const ENTITY_STATES = [...studentRoute, ...studentPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, ELearningAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StudentManageComponent,
        StudentManageDetailComponent,
        StudentManageUpdateComponent,
        StudentManageDeleteDialogComponent,
        StudentManageDeletePopupComponent
    ],
    entryComponents: [
        StudentManageComponent,
        StudentManageUpdateComponent,
        StudentManageDeleteDialogComponent,
        StudentManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningStudentManageModule {}
