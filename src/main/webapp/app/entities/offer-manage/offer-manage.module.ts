import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    OfferManageComponent,
    OfferManageDetailComponent,
    OfferManageUpdateComponent,
    OfferManageDeletePopupComponent,
    OfferManageDeleteDialogComponent,
    offerRoute,
    offerPopupRoute
} from './';

const ENTITY_STATES = [...offerRoute, ...offerPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OfferManageComponent,
        OfferManageDetailComponent,
        OfferManageUpdateComponent,
        OfferManageDeleteDialogComponent,
        OfferManageDeletePopupComponent
    ],
    entryComponents: [OfferManageComponent, OfferManageUpdateComponent, OfferManageDeleteDialogComponent, OfferManageDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningOfferManageModule {}
