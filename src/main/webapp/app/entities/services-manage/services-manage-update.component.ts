import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IServicesManage } from 'app/shared/model/services-manage.model';
import { ServicesManageService } from './services-manage.service';

@Component({
    selector: 'jhi-services-manage-update',
    templateUrl: './services-manage-update.component.html'
})
export class ServicesManageUpdateComponent implements OnInit {
    private _services: IServicesManage;
    isSaving: boolean;

    constructor(private servicesService: ServicesManageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ services }) => {
            this.services = services;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.services.id !== undefined) {
            this.subscribeToSaveResponse(this.servicesService.update(this.services));
        } else {
            this.subscribeToSaveResponse(this.servicesService.create(this.services));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IServicesManage>>) {
        result.subscribe((res: HttpResponse<IServicesManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get services() {
        return this._services;
    }

    set services(services: IServicesManage) {
        this._services = services;
    }
}
