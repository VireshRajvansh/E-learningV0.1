import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    StripeTransactionManageComponent,
    StripeTransactionManageDetailComponent,
    StripeTransactionManageUpdateComponent,
    StripeTransactionManageDeletePopupComponent,
    StripeTransactionManageDeleteDialogComponent,
    stripeTransactionRoute,
    stripeTransactionPopupRoute
} from './';

const ENTITY_STATES = [...stripeTransactionRoute, ...stripeTransactionPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StripeTransactionManageComponent,
        StripeTransactionManageDetailComponent,
        StripeTransactionManageUpdateComponent,
        StripeTransactionManageDeleteDialogComponent,
        StripeTransactionManageDeletePopupComponent
    ],
    entryComponents: [
        StripeTransactionManageComponent,
        StripeTransactionManageUpdateComponent,
        StripeTransactionManageDeleteDialogComponent,
        StripeTransactionManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningStripeTransactionManageModule {}
