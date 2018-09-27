import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServicesManage } from 'app/shared/model/services-manage.model';

@Component({
    selector: 'jhi-services-manage-detail',
    templateUrl: './services-manage-detail.component.html'
})
export class ServicesManageDetailComponent implements OnInit {
    services: IServicesManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ services }) => {
            this.services = services;
        });
    }

    previousState() {
        window.history.back();
    }
}
