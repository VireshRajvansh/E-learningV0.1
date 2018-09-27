import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICardExpiryReminderManage } from 'app/shared/model/card-expiry-reminder-manage.model';

@Component({
    selector: 'jhi-card-expiry-reminder-manage-detail',
    templateUrl: './card-expiry-reminder-manage-detail.component.html'
})
export class CardExpiryReminderManageDetailComponent implements OnInit {
    cardExpiryReminder: ICardExpiryReminderManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cardExpiryReminder }) => {
            this.cardExpiryReminder = cardExpiryReminder;
        });
    }

    previousState() {
        window.history.back();
    }
}
