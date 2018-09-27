import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourseManage } from 'app/shared/model/course-manage.model';

@Component({
    selector: 'jhi-course-manage-detail',
    templateUrl: './course-manage-detail.component.html'
})
export class CourseManageDetailComponent implements OnInit {
    course: ICourseManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ course }) => {
            this.course = course;
        });
    }

    previousState() {
        window.history.back();
    }
}
