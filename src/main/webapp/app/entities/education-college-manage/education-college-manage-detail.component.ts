import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEducationCollegeManage } from 'app/shared/model/education-college-manage.model';

@Component({
    selector: 'jhi-education-college-manage-detail',
    templateUrl: './education-college-manage-detail.component.html'
})
export class EducationCollegeManageDetailComponent implements OnInit {
    educationCollege: IEducationCollegeManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ educationCollege }) => {
            this.educationCollege = educationCollege;
        });
    }

    previousState() {
        window.history.back();
    }
}
