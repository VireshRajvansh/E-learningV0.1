import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEducationManage } from 'app/shared/model/education-manage.model';
import { EducationManageService } from './education-manage.service';

@Component({
    selector: 'jhi-education-manage-update',
    templateUrl: './education-manage-update.component.html'
})
export class EducationManageUpdateComponent implements OnInit {
    private _education: IEducationManage;
    isSaving: boolean;

    constructor(private educationService: EducationManageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ education }) => {
            this.education = education;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.education.id !== undefined) {
            this.subscribeToSaveResponse(this.educationService.update(this.education));
        } else {
            this.subscribeToSaveResponse(this.educationService.create(this.education));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEducationManage>>) {
        result.subscribe((res: HttpResponse<IEducationManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get education() {
        return this._education;
    }

    set education(education: IEducationManage) {
        this._education = education;
    }
}
