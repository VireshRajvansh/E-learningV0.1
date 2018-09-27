import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaxRateManage } from 'app/shared/model/tax-rate-manage.model';

@Component({
    selector: 'jhi-tax-rate-manage-detail',
    templateUrl: './tax-rate-manage-detail.component.html'
})
export class TaxRateManageDetailComponent implements OnInit {
    taxRate: ITaxRateManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ taxRate }) => {
            this.taxRate = taxRate;
        });
    }

    previousState() {
        window.history.back();
    }
}
