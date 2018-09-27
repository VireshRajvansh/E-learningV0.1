import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAddressManage } from 'app/shared/model/address-manage.model';
import { AddressManageService } from './address-manage.service';

@Component({
    selector: 'jhi-address-manage-update',
    templateUrl: './address-manage-update.component.html'
})
export class AddressManageUpdateComponent implements OnInit {
    private _address: IAddressManage;
    isSaving: boolean;

    constructor(private addressService: AddressManageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ address }) => {
            this.address = address;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.address.id !== undefined) {
            this.subscribeToSaveResponse(this.addressService.update(this.address));
        } else {
            this.subscribeToSaveResponse(this.addressService.create(this.address));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAddressManage>>) {
        result.subscribe((res: HttpResponse<IAddressManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get address() {
        return this._address;
    }

    set address(address: IAddressManage) {
        this._address = address;
    }
}
