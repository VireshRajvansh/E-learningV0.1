import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStateManage } from 'app/shared/model/state-manage.model';
import { StateManageService } from './state-manage.service';

@Component({
    selector: 'jhi-state-manage-update',
    templateUrl: './state-manage-update.component.html'
})
export class StateManageUpdateComponent implements OnInit {
    private _state: IStateManage;
    isSaving: boolean;

    constructor(private stateService: StateManageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ state }) => {
            this.state = state;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.state.id !== undefined) {
            this.subscribeToSaveResponse(this.stateService.update(this.state));
        } else {
            this.subscribeToSaveResponse(this.stateService.create(this.state));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStateManage>>) {
        result.subscribe((res: HttpResponse<IStateManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get state() {
        return this._state;
    }

    set state(state: IStateManage) {
        this._state = state;
    }
}
