import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from 'app/shared';
import { ELearningAdminModule } from 'app/admin/admin.module';
import {
    ArticleManageComponent,
    ArticleManageDetailComponent,
    ArticleManageUpdateComponent,
    ArticleManageDeletePopupComponent,
    ArticleManageDeleteDialogComponent,
    articleRoute,
    articlePopupRoute
} from './';

const ENTITY_STATES = [...articleRoute, ...articlePopupRoute];

@NgModule({
    imports: [ELearningSharedModule, ELearningAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ArticleManageComponent,
        ArticleManageDetailComponent,
        ArticleManageUpdateComponent,
        ArticleManageDeleteDialogComponent,
        ArticleManageDeletePopupComponent
    ],
    entryComponents: [
        ArticleManageComponent,
        ArticleManageUpdateComponent,
        ArticleManageDeleteDialogComponent,
        ArticleManageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningArticleManageModule {}
