import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGalleryManage } from 'app/shared/model/gallery-manage.model';
import { GalleryManageService } from './gallery-manage.service';
import { IGalleryGroupManage } from 'app/shared/model/gallery-group-manage.model';
import { GalleryGroupManageService } from 'app/entities/gallery-group-manage';

@Component({
    selector: 'jhi-gallery-manage-update',
    templateUrl: './gallery-manage-update.component.html'
})
export class GalleryManageUpdateComponent implements OnInit {
    private _gallery: IGalleryManage;
    isSaving: boolean;

    gallerygroups: IGalleryGroupManage[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private galleryService: GalleryManageService,
        private galleryGroupService: GalleryGroupManageService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gallery }) => {
            this.gallery = gallery;
        });
        this.galleryGroupService.query().subscribe(
            (res: HttpResponse<IGalleryGroupManage[]>) => {
                this.gallerygroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gallery.id !== undefined) {
            this.subscribeToSaveResponse(this.galleryService.update(this.gallery));
        } else {
            this.subscribeToSaveResponse(this.galleryService.create(this.gallery));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGalleryManage>>) {
        result.subscribe((res: HttpResponse<IGalleryManage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGalleryGroupById(index: number, item: IGalleryGroupManage) {
        return item.id;
    }
    get gallery() {
        return this._gallery;
    }

    set gallery(gallery: IGalleryManage) {
        this._gallery = gallery;
    }
}
