import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGalleryGroupManage } from 'app/shared/model/gallery-group-manage.model';
import { GalleryGroupManageService } from './gallery-group-manage.service';

@Component({
    selector: 'jhi-gallery-group-manage-update',
    templateUrl: './gallery-group-manage-update.component.html'
})
export class GalleryGroupManageUpdateComponent implements OnInit {
    private _galleryGroup: IGalleryGroupManage;
    isSaving: boolean;

    constructor(private galleryGroupService: GalleryGroupManageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ galleryGroup }) => {
            this.galleryGroup = galleryGroup;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.galleryGroup.id !== undefined) {
            this.subscribeToSaveResponse(this.galleryGroupService.update(this.galleryGroup));
        } else {
            this.subscribeToSaveResponse(this.galleryGroupService.create(this.galleryGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGalleryGroupManage>>) {
        result.subscribe((res: HttpResponse<IGalleryGroupManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get galleryGroup() {
        return this._galleryGroup;
    }

    set galleryGroup(galleryGroup: IGalleryGroupManage) {
        this._galleryGroup = galleryGroup;
    }
}
