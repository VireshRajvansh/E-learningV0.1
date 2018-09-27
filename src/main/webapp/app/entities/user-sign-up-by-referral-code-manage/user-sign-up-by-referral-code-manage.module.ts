import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import { ELearningAdminModule } from 'app/admin/admin.module';
import {
    UserSignUpByReferralCodeManageComponent,
    UserSignUpByReferralCodeManageDetailComponent,
    UserSignUpByReferralCodeManageUpdateComponent,
    UserSignUpByReferralCodeManageDeletePopupComponent,
    UserSignUpByReferralCodeManageDeleteDialogComponent,
    userSignUpByReferralCodeRoute,
    userSignUpByReferralCodePopupRoute
} from './';

const ENTITY_STATES = [...userSignUpByReferralCodeRoute, ...userSignUpByReferralCodePopupRoute];

@NgModule({
    imports: [ELearningSharedModule, ELearningAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserSignUpByReferralCodeManageComponent,
        UserSignUpByReferralCodeManageDetailComponent,
        UserSignUpByReferralCodeManageUpdateComponent,
        UserSignUpByReferralCodeManageDeleteDialogComponent,
        UserSignUpByReferralCodeManageDeletePopupComponent
    ],
    entryComponents: [
        UserSignUpByReferralCodeManageComponent,
        UserSignUpByReferralCodeManageUpdateComponent,
        UserSignUpByReferralCodeManageDeleteDialogComponent,
        UserSignUpByReferralCodeManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningUserSignUpByReferralCodeManageModule {}
