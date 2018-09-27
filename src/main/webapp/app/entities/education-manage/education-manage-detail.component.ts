import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEducationManage } from 'app/shared/model/education-manage.model';

@Component({
    selector: 'jhi-education-manage-detail',
    templateUrl: './education-manage-detail.component.html'
})
export class EducationManageDetailComponent implements OnInit {
    education: IEducationManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ education }) => {
            this.education = education;
        });
    }

    previousState() {
        window.history.back();
    }
}
