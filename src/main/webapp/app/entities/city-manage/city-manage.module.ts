import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    CityManageComponent,
    CityManageDetailComponent,
    CityManageUpdateComponent,
    CityManageDeletePopupComponent,
    CityManageDeleteDialogComponent,
    cityRoute,
    cityPopupRoute
} from './';

const ENTITY_STATES = [...cityRoute, ...cityPopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CityManageComponent,
        CityManageDetailComponent,
        CityManageUpdateComponent,
        CityManageDeleteDialogComponent,
        CityManageDeletePopupComponent
    ],
    entryComponents: [CityManageComponent, CityManageUpdateComponent, CityManageDeleteDialogComponent, CityManageDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningCityManageModule {}
