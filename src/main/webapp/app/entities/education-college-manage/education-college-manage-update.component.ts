import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEducationCollegeManage } from 'app/shared/model/education-college-manage.model';
import { EducationCollegeManageService } from './education-college-manage.service';

@Component({
    selector: 'jhi-education-college-manage-update',
    templateUrl: './education-college-manage-update.component.html'
})
export class EducationCollegeManageUpdateComponent implements OnInit {
    private _educationCollege: IEducationCollegeManage;
    isSaving: boolean;

    constructor(private educationCollegeService: EducationCollegeManageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ educationCollege }) => {
            this.educationCollege = educationCollege;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.educationCollege.id !== undefined) {
            this.subscribeToSaveResponse(this.educationCollegeService.update(this.educationCollege));
        } else {
            this.subscribeToSaveResponse(this.educationCollegeService.create(this.educationCollege));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEducationCollegeManage>>) {
        result.subscribe(
            (res: HttpResponse<IEducationCollegeManage>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get educationCollege() {
        return this._educationCollege;
    }

    set educationCollege(educationCollege: IEducationCollegeManage) {
        this._educationCollege = educationCollege;
    }
}
