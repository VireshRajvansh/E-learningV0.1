import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGalleryGroupManage } from 'app/shared/model/gallery-group-manage.model';

@Component({
    selector: 'jhi-gallery-group-manage-detail',
    templateUrl: './gallery-group-manage-detail.component.html'
})
export class GalleryGroupManageDetailComponent implements OnInit {
    galleryGroup: IGalleryGroupManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ galleryGroup }) => {
            this.galleryGroup = galleryGroup;
        });
    }

    previousState() {
        window.history.back();
    }
}
