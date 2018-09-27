import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStudentManage } from 'app/shared/model/student-manage.model';
import { StudentManageService } from './student-manage.service';
import { IStripeCustomerManage } from 'app/shared/model/stripe-customer-manage.model';
import { StripeCustomerManageService } from 'app/entities/stripe-customer-manage';
import { IUser, UserService } from 'app/core';
import { IAddressManage } from 'app/shared/model/address-manage.model';
import { AddressManageService } from 'app/entities/address-manage';
import { IEducationCollegeManage } from 'app/shared/model/education-college-manage.model';
import { EducationCollegeManageService } from 'app/entities/education-college-manage';

@Component({
    selector: 'jhi-student-manage-update',
    templateUrl: './student-manage-update.component.html'
})
export class StudentManageUpdateComponent implements OnInit {
    private _student: IStudentManage;
    isSaving: boolean;

    stripecustomers: IStripeCustomerManage[];

    users: IUser[];

    addresses: IAddressManage[];

    educationcolleges: IEducationCollegeManage[];
    dobDp: any;
    premiumTillDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private studentService: StudentManageService,
        private stripeCustomerService: StripeCustomerManageService,
        private userService: UserService,
        private addressService: AddressManageService,
        private educationCollegeService: EducationCollegeManageService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ student }) => {
            this.student = student;
        });
        this.stripeCustomerService.query({ filter: 'student-is-null' }).subscribe(
            (res: HttpResponse<IStripeCustomerManage[]>) => {
                if (!this.student.stripeCustomer || !this.student.stripeCustomer.id) {
                    this.stripecustomers = res.body;
                } else {
                    this.stripeCustomerService.find(this.student.stripeCustomer.id).subscribe(
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
        if (this.student.id !== undefined) {
            this.subscribeToSaveResponse(this.studentService.update(this.student));
        } else {
            this.subscribeToSaveResponse(this.studentService.create(this.student));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStudentManage>>) {
        result.subscribe((res: HttpResponse<IStudentManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get student() {
        return this._student;
    }

    set student(student: IStudentManage) {
        this._student = student;
    }
}
