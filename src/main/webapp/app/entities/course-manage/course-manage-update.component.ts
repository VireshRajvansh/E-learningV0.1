import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICourseManage } from 'app/shared/model/course-manage.model';
import { CourseManageService } from './course-manage.service';
import { IPlayListManage } from 'app/shared/model/play-list-manage.model';
import { PlayListManageService } from 'app/entities/play-list-manage';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-course-manage-update',
    templateUrl: './course-manage-update.component.html'
})
export class CourseManageUpdateComponent implements OnInit {
    private _course: ICourseManage;
    isSaving: boolean;

    playlists: IPlayListManage[];

    users: IUser[];
    premiumTillDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private courseService: CourseManageService,
        private playListService: PlayListManageService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ course }) => {
            this.course = course;
        });
        this.playListService.query().subscribe(
            (res: HttpResponse<IPlayListManage[]>) => {
                this.playlists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.course.id !== undefined) {
            this.subscribeToSaveResponse(this.courseService.update(this.course));
        } else {
            this.subscribeToSaveResponse(this.courseService.create(this.course));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICourseManage>>) {
        result.subscribe((res: HttpResponse<ICourseManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPlayListById(index: number, item: IPlayListManage) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get course() {
        return this._course;
    }

    set course(course: ICourseManage) {
        this._course = course;
    }
}
