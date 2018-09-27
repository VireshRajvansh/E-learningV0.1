import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOfferManage } from 'app/shared/model/offer-manage.model';
import { OfferManageService } from './offer-manage.service';

@Component({
    selector: 'jhi-offer-manage-update',
    templateUrl: './offer-manage-update.component.html'
})
export class OfferManageUpdateComponent implements OnInit {
    private _offer: IOfferManage;
    isSaving: boolean;

    constructor(private offerService: OfferManageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ offer }) => {
            this.offer = offer;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.offer.id !== undefined) {
            this.subscribeToSaveResponse(this.offerService.update(this.offer));
        } else {
            this.subscribeToSaveResponse(this.offerService.create(this.offer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOfferManage>>) {
        result.subscribe((res: HttpResponse<IOfferManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get offer() {
        return this._offer;
    }

    set offer(offer: IOfferManage) {
        this._offer = offer;
    }
}
