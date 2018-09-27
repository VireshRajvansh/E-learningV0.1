import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobsManage } from 'app/shared/model/jobs-manage.model';

@Component({
    selector: 'jhi-jobs-manage-detail',
    templateUrl: './jobs-manage-detail.component.html'
})
export class JobsManageDetailComponent implements OnInit {
    jobs: IJobsManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobs }) => {
            this.jobs = jobs;
        });
    }

    previousState() {
        window.history.back();
    }
}
