import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeacherManage } from 'app/shared/model/teacher-manage.model';

@Component({
    selector: 'jhi-teacher-manage-detail',
    templateUrl: './teacher-manage-detail.component.html'
})
export class TeacherManageDetailComponent implements OnInit {
    teacher: ITeacherManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ teacher }) => {
            this.teacher = teacher;
        });
    }

    previousState() {
        window.history.back();
    }
}
