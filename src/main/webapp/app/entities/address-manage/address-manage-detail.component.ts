import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAddressManage } from 'app/shared/model/address-manage.model';

@Component({
    selector: 'jhi-address-manage-detail',
    templateUrl: './address-manage-detail.component.html'
})
export class AddressManageDetailComponent implements OnInit {
    address: IAddressManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ address }) => {
            this.address = address;
        });
    }

    previousState() {
        window.history.back();
    }
}
