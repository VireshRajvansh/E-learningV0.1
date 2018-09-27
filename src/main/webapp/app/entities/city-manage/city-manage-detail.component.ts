import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICityManage } from 'app/shared/model/city-manage.model';

@Component({
    selector: 'jhi-city-manage-detail',
    templateUrl: './city-manage-detail.component.html'
})
export class CityManageDetailComponent implements OnInit {
    city: ICityManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ city }) => {
            this.city = city;
        });
    }

    previousState() {
        window.history.back();
    }
}
