import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    QuizAnsManageComponent,
    QuizAnsManageDetailComponent,
    QuizAnsManageUpdateComponent,
    QuizAnsManageDeletePopupComponent,
    QuizAnsManageDeleteDialogComponent,
    quizAnsRoute,
    quizAnsPopupRoute
} from './';

const ENTITY_STATES = [...quizAnsRoute, ...quizAnsPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QuizAnsManageComponent,
        QuizAnsManageDetailComponent,
        QuizAnsManageUpdateComponent,
        QuizAnsManageDeleteDialogComponent,
        QuizAnsManageDeletePopupComponent
    ],
    entryComponents: [
        QuizAnsManageComponent,
        QuizAnsManageUpdateComponent,
        QuizAnsManageDeleteDialogComponent,
        QuizAnsManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningQuizAnsManageModule {}
