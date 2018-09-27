import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import {
    StateManageComponent,
    StateManageDetailComponent,
    StateManageUpdateComponent,
    StateManageDeletePopupComponent,
    StateManageDeleteDialogComponent,
    stateRoute,
    statePopupRoute
} from './';

const ENTITY_STATES = [...stateRoute, ...statePopupRoute];

@NgModule({
    imports: [ELearningSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StateManageComponent,
        StateManageDetailComponent,
        StateManageUpdateComponent,
        StateManageDeleteDialogComponent,
        StateManageDeletePopupComponent
    ],
    entryComponents: [StateManageComponent, StateManageUpdateComponent, StateManageDeleteDialogComponent, StateManageDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningStateManageModule {}
