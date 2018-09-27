import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    TaxRateManageComponent,
    TaxRateManageDetailComponent,
    TaxRateManageUpdateComponent,
    TaxRateManageDeletePopupComponent,
    TaxRateManageDeleteDialogComponent,
    taxRateRoute,
    taxRatePopupRoute
} from './';

const ENTITY_STATES = [...taxRateRoute, ...taxRatePopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TaxRateManageComponent,
        TaxRateManageDetailComponent,
        TaxRateManageUpdateComponent,
        TaxRateManageDeleteDialogComponent,
        TaxRateManageDeletePopupComponent
    ],
    entryComponents: [
        TaxRateManageComponent,
        TaxRateManageUpdateComponent,
        TaxRateManageDeleteDialogComponent,
        TaxRateManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningTaxRateManageModule {}
