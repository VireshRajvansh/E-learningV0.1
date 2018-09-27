import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    AddressManageComponent,
    AddressManageDetailComponent,
    AddressManageUpdateComponent,
    AddressManageDeletePopupComponent,
    AddressManageDeleteDialogComponent,
    addressRoute,
    addressPopupRoute
} from './';

const ENTITY_STATES = [...addressRoute, ...addressPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AddressManageComponent,
        AddressManageDetailComponent,
        AddressManageUpdateComponent,
        AddressManageDeleteDialogComponent,
        AddressManageDeletePopupComponent
    ],
    entryComponents: [
        AddressManageComponent,
        AddressManageUpdateComponent,
        AddressManageDeleteDialogComponent,
        AddressManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningAddressManageModule {}
