import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGalleryManage } from 'app/shared/model/gallery-manage.model';

@Component({
    selector: 'jhi-gallery-manage-detail',
    templateUrl: './gallery-manage-detail.component.html'
})
export class GalleryManageDetailComponent implements OnInit {
    gallery: IGalleryManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gallery }) => {
            this.gallery = gallery;
        });
    }

    previousState() {
        window.history.back();
    }
}
