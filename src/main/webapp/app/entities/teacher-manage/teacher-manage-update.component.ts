import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITeacherManage } from 'app/shared/model/teacher-manage.model';
import { TeacherManageService } from './teacher-manage.service';
import { IStripeCustomerManage } from 'app/shared/model/stripe-customer-manage.model';
import { StripeCustomerManageService } from 'app/entities/stripe-customer-manage';
import { IUser, UserService } from 'app/core';
import { IAddressManage } from 'app/shared/model/address-manage.model';
import { AddressManageService } from 'app/entities/address-manage';
import { IEducationCollegeManage } from 'app/shared/model/education-college-manage.model';
import { EducationCollegeManageService } from 'app/entities/education-college-manage';

@Component({
    selector: 'jhi-teacher-manage-update',
    templateUrl: './teacher-manage-update.component.html'
})
export class TeacherManageUpdateComponent implements OnInit {
    private _teacher: ITeacherManage;
    isSaving: boolean;

    stripecustomers: IStripeCustomerManage[];

    users: IUser[];

    addresses: IAddressManage[];

    educationcolleges: IEducationCollegeManage[];
    dobDp: any;
    premiumTillDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private teacherService: TeacherManageService,
        private stripeCustomerService: StripeCustomerManageService,
        private userService: UserService,
        private addressService: AddressManageService,
        private educationCollegeService: EducationCollegeManageService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ teacher }) => {
            this.teacher = teacher;
        });
        this.stripeCustomerService.query({ filter: 'teacher-is-null' }).subscribe(
            (res: HttpResponse<IStripeCustomerManage[]>) => {
                if (!this.teacher.stripeCustomer || !this.teacher.stripeCustomer.id) {
                    this.stripecustomers = res.body;
                } else {
                    this.stripeCustomerService.find(this.teacher.stripeCustomer.id).subscribe(
                        (subRes: HttpResponse<IStripeCustomerManage>) => {
                            this.stripecustomers = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.addressService.query().subscribe(
            (res: HttpResponse<IAddressManage[]>) => {
                this.addresses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.educationCollegeService.query().subscribe(
            (res: HttpResponse<IEducationCollegeManage[]>) => {
                this.educationcolleges = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.teacher.id !== undefined) {
            this.subscribeToSaveResponse(this.teacherService.update(this.teacher));
        } else {
            this.subscribeToSaveResponse(this.teacherService.create(this.teacher));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITeacherManage>>) {
        result.subscribe((res: HttpResponse<ITeacherManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStripeCustomerById(index: number, item: IStripeCustomerManage) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackAddressById(index: number, item: IAddressManage) {
        return item.id;
    }

    trackEducationCollegeById(index: number, item: IEducationCollegeManage) {
        return item.id;
    }
    get teacher() {
        return this._teacher;
    }

    set teacher(teacher: ITeacherManage) {
        this._teacher = teacher;
    }
}
