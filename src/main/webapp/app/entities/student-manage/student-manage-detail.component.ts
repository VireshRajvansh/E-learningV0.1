import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudentManage } from 'app/shared/model/student-manage.model';

@Component({
    selector: 'jhi-student-manage-detail',
    templateUrl: './student-manage-detail.component.html'
})
export class StudentManageDetailComponent implements OnInit {
    student: IStudentManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ student }) => {
            this.student = student;
        });
    }

    previousState() {
        window.history.back();
    }
}
