import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import { ELearningAdminModule } from 'app/admin/admin.module';
import {
    StripeCustomerManageComponent,
    StripeCustomerManageDetailComponent,
    StripeCustomerManageUpdateComponent,
    StripeCustomerManageDeletePopupComponent,
    StripeCustomerManageDeleteDialogComponent,
    stripeCustomerRoute,
    stripeCustomerPopupRoute
} from './';

const ENTITY_STATES = [...stripeCustomerRoute, ...stripeCustomerPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, ELearningAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StripeCustomerManageComponent,
        StripeCustomerManageDetailComponent,
        StripeCustomerManageUpdateComponent,
        StripeCustomerManageDeleteDialogComponent,
        StripeCustomerManageDeletePopupComponent
    ],
    entryComponents: [
        StripeCustomerManageComponent,
        StripeCustomerManageUpdateComponent,
        StripeCustomerManageDeleteDialogComponent,
        StripeCustomerManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningStripeCustomerManageModule {}
