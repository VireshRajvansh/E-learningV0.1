import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITaxRateManage } from 'app/shared/model/tax-rate-manage.model';
import { TaxRateManageService } from './tax-rate-manage.service';

@Component({
    selector: 'jhi-tax-rate-manage-update',
    templateUrl: './tax-rate-manage-update.component.html'
})
export class TaxRateManageUpdateComponent implements OnInit {
    private _taxRate: ITaxRateManage;
    isSaving: boolean;

    constructor(private taxRateService: TaxRateManageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ taxRate }) => {
            this.taxRate = taxRate;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.taxRate.id !== undefined) {
            this.subscribeToSaveResponse(this.taxRateService.update(this.taxRate));
        } else {
            this.subscribeToSaveResponse(this.taxRateService.create(this.taxRate));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITaxRateManage>>) {
        result.subscribe((res: HttpResponse<ITaxRateManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get taxRate() {
        return this._taxRate;
    }

    set taxRate(taxRate: ITaxRateManage) {
        this._taxRate = taxRate;
    }
}
