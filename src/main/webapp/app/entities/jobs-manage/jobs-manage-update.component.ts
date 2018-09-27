import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IJobsManage } from 'app/shared/model/jobs-manage.model';
import { JobsManageService } from './jobs-manage.service';

@Component({
    selector: 'jhi-jobs-manage-update',
    templateUrl: './jobs-manage-update.component.html'
})
export class JobsManageUpdateComponent implements OnInit {
    private _jobs: IJobsManage;
    isSaving: boolean;
    runOnDp: any;

    constructor(private jobsService: JobsManageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ jobs }) => {
            this.jobs = jobs;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.jobs.id !== undefined) {
            this.subscribeToSaveResponse(this.jobsService.update(this.jobs));
        } else {
            this.subscribeToSaveResponse(this.jobsService.create(this.jobs));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IJobsManage>>) {
        result.subscribe((res: HttpResponse<IJobsManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get jobs() {
        return this._jobs;
    }

    set jobs(jobs: IJobsManage) {
        this._jobs = jobs;
    }
}
