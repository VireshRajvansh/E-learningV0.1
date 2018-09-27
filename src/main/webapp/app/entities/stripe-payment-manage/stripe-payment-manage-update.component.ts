import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IStripePaymentManage } from 'app/shared/model/stripe-payment-manage.model';
import { StripePaymentManageService } from './stripe-payment-manage.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-stripe-payment-manage-update',
    templateUrl: './stripe-payment-manage-update.component.html'
})
export class StripePaymentManageUpdateComponent implements OnInit {
    private _stripePayment: IStripePaymentManage;
    isSaving: boolean;

    users: IUser[];
    created: string;
    planCreated: string;
    periodEnd: string;
    periodStart: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private stripePaymentService: StripePaymentManageService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stripePayment }) => {
            this.stripePayment = stripePayment;
        });
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
        this.stripePayment.created = moment(this.created, DATE_TIME_FORMAT);
        this.stripePayment.planCreated = moment(this.planCreated, DATE_TIME_FORMAT);
        this.stripePayment.periodEnd = moment(this.periodEnd, DATE_TIME_FORMAT);
        this.stripePayment.periodStart = moment(this.periodStart, DATE_TIME_FORMAT);
        if (this.stripePayment.id !== undefined) {
            this.subscribeToSaveResponse(this.stripePaymentService.update(this.stripePayment));
        } else {
            this.subscribeToSaveResponse(this.stripePaymentService.create(this.stripePayment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStripePaymentManage>>) {
        result.subscribe((res: HttpResponse<IStripePaymentManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get stripePayment() {
        return this._stripePayment;
    }

    set stripePayment(stripePayment: IStripePaymentManage) {
        this._stripePayment = stripePayment;
        this.created = moment(stripePayment.created).format(DATE_TIME_FORMAT);
        this.planCreated = moment(stripePayment.planCreated).format(DATE_TIME_FORMAT);
        this.periodEnd = moment(stripePayment.periodEnd).format(DATE_TIME_FORMAT);
        this.periodStart = moment(stripePayment.periodStart).format(DATE_TIME_FORMAT);
    }
}
