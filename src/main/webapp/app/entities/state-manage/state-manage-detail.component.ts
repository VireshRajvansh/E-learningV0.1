import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStateManage } from 'app/shared/model/state-manage.model';

@Component({
    selector: 'jhi-state-manage-detail',
    templateUrl: './state-manage-detail.component.html'
})
export class StateManageDetailComponent implements OnInit {
    state: IStateManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ state }) => {
            this.state = state;
        });
    }

    previousState() {
        window.history.back();
    }
}
