import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStripePaymentManage } from 'app/shared/model/stripe-payment-manage.model';

@Component({
    selector: 'jhi-stripe-payment-manage-detail',
    templateUrl: './stripe-payment-manage-detail.component.html'
})
export class StripePaymentManageDetailComponent implements OnInit {
    stripePayment: IStripePaymentManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stripePayment }) => {
            this.stripePayment = stripePayment;
        });
    }

    previousState() {
        window.history.back();
    }
}
