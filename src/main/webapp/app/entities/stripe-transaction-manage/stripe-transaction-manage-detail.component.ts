import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStripeTransactionManage } from 'app/shared/model/stripe-transaction-manage.model';

@Component({
    selector: 'jhi-stripe-transaction-manage-detail',
    templateUrl: './stripe-transaction-manage-detail.component.html'
})
export class StripeTransactionManageDetailComponent implements OnInit {
    stripeTransaction: IStripeTransactionManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stripeTransaction }) => {
            this.stripeTransaction = stripeTransaction;
        });
    }

    previousState() {
        window.history.back();
    }
}
