import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStripeCustomerManage } from 'app/shared/model/stripe-customer-manage.model';

@Component({
    selector: 'jhi-stripe-customer-manage-detail',
    templateUrl: './stripe-customer-manage-detail.component.html'
})
export class StripeCustomerManageDetailComponent implements OnInit {
    stripeCustomer: IStripeCustomerManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stripeCustomer }) => {
            this.stripeCustomer = stripeCustomer;
        });
    }

    previousState() {
        window.history.back();
    }
}
