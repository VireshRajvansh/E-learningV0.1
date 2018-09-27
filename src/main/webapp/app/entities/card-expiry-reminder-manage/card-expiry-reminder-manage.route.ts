import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardExpiryReminderManage } from 'app/shared/model/card-expiry-reminder-manage.model';
import { CardExpiryReminderManageService } from './card-expiry-reminder-manage.service';
import { CardExpiryReminderManageComponent } from './card-expiry-reminder-manage.component';
import { CardExpiryReminderManageDetailComponent } from './card-expiry-reminder-manage-detail.component';
import { CardExpiryReminderManageUpdateComponent } from './card-expiry-reminder-manage-update.component';
import { CardExpiryReminderManageDeletePopupComponent } from './card-expiry-reminder-manage-delete-dialog.component';
import { ICardExpiryReminderManage } from 'app/shared/model/card-expiry-reminder-manage.model';

@Injectable({ providedIn: 'root' })
export class CardExpiryReminderManageResolve implements Resolve<ICardExpiryReminderManage> {
    constructor(private service: CardExpiryReminderManageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((cardExpiryReminder: HttpResponse<CardExpiryReminderManage>) => cardExpiryReminder.body));
        }
        return of(new CardExpiryReminderManage());
    }
}

export const cardExpiryReminderRoute: Routes = [
    {
        path: 'card-expiry-reminder-manage',
        component: CardExpiryReminderManageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'eLearningApp.cardExpiryReminder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'card-expiry-reminder-manage/:id/view',
        component: CardExpiryReminderManageDetailComponent,
        resolve: {
            cardExpiryReminder: CardExpiryReminderManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.cardExpiryReminder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'card-expiry-reminder-manage/new',
        component: CardExpiryReminderManageUpdateComponent,
        resolve: {
            cardExpiryReminder: CardExpiryReminderManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.cardExpiryReminder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'card-expiry-reminder-manage/:id/edit',
        component: CardExpiryReminderManageUpdateComponent,
        resolve: {
            cardExpiryReminder: CardExpiryReminderManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.cardExpiryReminder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardExpiryReminderPopupRoute: Routes = [
    {
        path: 'card-expiry-reminder-manage/:id/delete',
        component: CardExpiryReminderManageDeletePopupComponent,
        resolve: {
            cardExpiryReminder: CardExpiryReminderManageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.cardExpiryReminder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
