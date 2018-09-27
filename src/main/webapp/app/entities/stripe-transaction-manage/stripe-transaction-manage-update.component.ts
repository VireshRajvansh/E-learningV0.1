import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStripeTransactionManage } from 'app/shared/model/stripe-transaction-manage.model';
import { StripeTransactionManageService } from './stripe-transaction-manage.service';

@Component({
    selector: 'jhi-stripe-transaction-manage-update',
    templateUrl: './stripe-transaction-manage-update.component.html'
})
export class StripeTransactionManageUpdateComponent implements OnInit {
    private _stripeTransaction: IStripeTransactionManage;
    isSaving: boolean;

    constructor(private stripeTransactionService: StripeTransactionManageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stripeTransaction }) => {
            this.stripeTransaction = stripeTransaction;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.stripeTransaction.id !== undefined) {
            this.subscribeToSaveResponse(this.stripeTransactionService.update(this.stripeTransaction));
        } else {
            this.subscribeToSaveResponse(this.stripeTransactionService.create(this.stripeTransaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStripeTransactionManage>>) {
        result.subscribe(
            (res: HttpResponse<IStripeTransactionManage>) => this.onSaveSuccess(),
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
    get stripeTransaction() {
        return this._stripeTransaction;
    }

    set stripeTransaction(stripeTransaction: IStripeTransactionManage) {
        this._stripeTransaction = stripeTransaction;
    }
}
