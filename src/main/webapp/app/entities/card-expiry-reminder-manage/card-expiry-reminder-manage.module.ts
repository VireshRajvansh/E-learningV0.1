import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    CardExpiryReminderManageComponent,
    CardExpiryReminderManageDetailComponent,
    CardExpiryReminderManageUpdateComponent,
    CardExpiryReminderManageDeletePopupComponent,
    CardExpiryReminderManageDeleteDialogComponent,
    cardExpiryReminderRoute,
    cardExpiryReminderPopupRoute
} from './';

const ENTITY_STATES = [...cardExpiryReminderRoute, ...cardExpiryReminderPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CardExpiryReminderManageComponent,
        CardExpiryReminderManageDetailComponent,
        CardExpiryReminderManageUpdateComponent,
        CardExpiryReminderManageDeleteDialogComponent,
        CardExpiryReminderManageDeletePopupComponent
    ],
    entryComponents: [
        CardExpiryReminderManageComponent,
        CardExpiryReminderManageUpdateComponent,
        CardExpiryReminderManageDeleteDialogComponent,
        CardExpiryReminderManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningCardExpiryReminderManageModule {}
