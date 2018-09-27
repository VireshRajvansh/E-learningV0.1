import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import { ELearningAdminModule } from 'app/admin/admin.module';
import {
    StripePaymentManageComponent,
    StripePaymentManageDetailComponent,
    StripePaymentManageUpdateComponent,
    StripePaymentManageDeletePopupComponent,
    StripePaymentManageDeleteDialogComponent,
    stripePaymentRoute,
    stripePaymentPopupRoute
} from './';

const ENTITY_STATES = [...stripePaymentRoute, ...stripePaymentPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, ELearningAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StripePaymentManageComponent,
        StripePaymentManageDetailComponent,
        StripePaymentManageUpdateComponent,
        StripePaymentManageDeleteDialogComponent,
        StripePaymentManageDeletePopupComponent
    ],
    entryComponents: [
        StripePaymentManageComponent,
        StripePaymentManageUpdateComponent,
        StripePaymentManageDeleteDialogComponent,
        StripePaymentManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningStripePaymentManageModule {}
