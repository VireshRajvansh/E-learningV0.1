import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import { ELearningAdminModule } from 'app/admin/admin.module';
import {
    QuizManageComponent,
    QuizManageDetailComponent,
    QuizManageUpdateComponent,
    QuizManageDeletePopupComponent,
    QuizManageDeleteDialogComponent,
    quizRoute,
    quizPopupRoute
} from './';

const ENTITY_STATES = [...quizRoute, ...quizPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, ELearningAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QuizManageComponent,
        QuizManageDetailComponent,
        QuizManageUpdateComponent,
        QuizManageDeleteDialogComponent,
        QuizManageDeletePopupComponent
    ],
    entryComponents: [QuizManageComponent, QuizManageUpdateComponent, QuizManageDeleteDialogComponent, QuizManageDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningQuizManageModule {}
