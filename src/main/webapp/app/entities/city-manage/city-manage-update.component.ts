import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICityManage } from 'app/shared/model/city-manage.model';
import { CityManageService } from './city-manage.service';
import { IStateManage } from 'app/shared/model/state-manage.model';
import { StateManageService } from 'app/entities/state-manage';

@Component({
    selector: 'jhi-city-manage-update',
    templateUrl: './city-manage-update.component.html'
})
export class CityManageUpdateComponent implements OnInit {
    private _city: ICityManage;
    isSaving: boolean;

    states: IStateManage[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private cityService: CityManageService,
        private stateService: StateManageService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ city }) => {
            this.city = city;
        });
        this.stateService.query().subscribe(
            (res: HttpResponse<IStateManage[]>) => {
                this.states = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.city.id !== undefined) {
            this.subscribeToSaveResponse(this.cityService.update(this.city));
        } else {
            this.subscribeToSaveResponse(this.cityService.create(this.city));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICityManage>>) {
        result.subscribe((res: HttpResponse<ICityManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStateById(index: number, item: IStateManage) {
        return item.id;
    }
    get city() {
        return this._city;
    }

    set city(city: ICityManage) {
        this._city = city;
    }
}
