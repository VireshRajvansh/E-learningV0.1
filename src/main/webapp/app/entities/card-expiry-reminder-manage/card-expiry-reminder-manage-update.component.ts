import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICardExpiryReminderManage } from 'app/shared/model/card-expiry-reminder-manage.model';
import { CardExpiryReminderManageService } from './card-expiry-reminder-manage.service';

@Component({
    selector: 'jhi-card-expiry-reminder-manage-update',
    templateUrl: './card-expiry-reminder-manage-update.component.html'
})
export class CardExpiryReminderManageUpdateComponent implements OnInit {
    private _cardExpiryReminder: ICardExpiryReminderManage;
    isSaving: boolean;
    sendOnDateDp: any;

    constructor(private cardExpiryReminderService: CardExpiryReminderManageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cardExpiryReminder }) => {
            this.cardExpiryReminder = cardExpiryReminder;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cardExpiryReminder.id !== undefined) {
            this.subscribeToSaveResponse(this.cardExpiryReminderService.update(this.cardExpiryReminder));
        } else {
            this.subscribeToSaveResponse(this.cardExpiryReminderService.create(this.cardExpiryReminder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICardExpiryReminderManage>>) {
        result.subscribe(
            (res: HttpResponse<ICardExpiryReminderManage>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get cardExpiryReminder() {
        return this._cardExpiryReminder;
    }

    set cardExpiryReminder(cardExpiryReminder: ICardExpiryReminderManage) {
        this._cardExpiryReminder = cardExpiryReminder;
    }
}
