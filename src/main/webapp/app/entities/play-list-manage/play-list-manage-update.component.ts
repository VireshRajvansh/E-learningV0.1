import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPlayListManage } from 'app/shared/model/play-list-manage.model';
import { PlayListManageService } from './play-list-manage.service';

@Component({
    selector: 'jhi-play-list-manage-update',
    templateUrl: './play-list-manage-update.component.html'
})
export class PlayListManageUpdateComponent implements OnInit {
    private _playList: IPlayListManage;
    isSaving: boolean;

    constructor(private playListService: PlayListManageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ playList }) => {
            this.playList = playList;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.playList.id !== undefined) {
            this.subscribeToSaveResponse(this.playListService.update(this.playList));
        } else {
            this.subscribeToSaveResponse(this.playListService.create(this.playList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPlayListManage>>) {
        result.subscribe((res: HttpResponse<IPlayListManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get playList() {
        return this._playList;
    }

    set playList(playList: IPlayListManage) {
        this._playList = playList;
    }
}
