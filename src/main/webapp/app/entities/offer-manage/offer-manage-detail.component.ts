import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOfferManage } from 'app/shared/model/offer-manage.model';

@Component({
    selector: 'jhi-offer-manage-detail',
    templateUrl: './offer-manage-detail.component.html'
})
export class OfferManageDetailComponent implements OnInit {
    offer: IOfferManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ offer }) => {
            this.offer = offer;
        });
    }

    previousState() {
        window.history.back();
    }
}
