import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IStripeCustomerManage } from 'app/shared/model/stripe-customer-manage.model';
import { StripeCustomerManageService } from './stripe-customer-manage.service';
import { IUser, UserService } from 'app/core';
import { IStudentManage } from 'app/shared/model/student-manage.model';
import { StudentManageService } from 'app/entities/student-manage';
import { ITeacherManage } from 'app/shared/model/teacher-manage.model';
import { TeacherManageService } from 'app/entities/teacher-manage';

@Component({
    selector: 'jhi-stripe-customer-manage-update',
    templateUrl: './stripe-customer-manage-update.component.html'
})
export class StripeCustomerManageUpdateComponent implements OnInit {
    private _stripeCustomer: IStripeCustomerManage;
    isSaving: boolean;

    users: IUser[];

    students: IStudentManage[];

    teachers: ITeacherManage[];
    created: string;
    expectedExpiryDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private stripeCustomerService: StripeCustomerManageService,
        private userService: UserService,
        private studentService: StudentManageService,
        private teacherService: TeacherManageService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stripeCustomer }) => {
            this.stripeCustomer = stripeCustomer;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.studentService.query().subscribe(
            (res: HttpResponse<IStudentManage[]>) => {
                this.students = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.teacherService.query().subscribe(
            (res: HttpResponse<ITeacherManage[]>) => {
                this.teachers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.stripeCustomer.created = moment(this.created, DATE_TIME_FORMAT);
        if (this.stripeCustomer.id !== undefined) {
            this.subscribeToSaveResponse(this.stripeCustomerService.update(this.stripeCustomer));
        } else {
            this.subscribeToSaveResponse(this.stripeCustomerService.create(this.stripeCustomer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStripeCustomerManage>>) {
        result.subscribe(
            (res: HttpResponse<IStripeCustomerManage>) => this.onSaveSuccess(),
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackStudentById(index: number, item: IStudentManage) {
        return item.id;
    }

    trackTeacherById(index: number, item: ITeacherManage) {
        return item.id;
    }
    get stripeCustomer() {
        return this._stripeCustomer;
    }

    set stripeCustomer(stripeCustomer: IStripeCustomerManage) {
        this._stripeCustomer = stripeCustomer;
        this.created = moment(stripeCustomer.created).format(DATE_TIME_FORMAT);
    }
}
