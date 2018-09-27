import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGalleryGroupManage } from 'app/shared/model/gallery-group-manage.model';
import { GalleryGroupManageService } from './gallery-group-manage.service';

@Component({
    selector: 'jhi-gallery-group-manage-delete-dialog',
    templateUrl: './gallery-group-manage-delete-dialog.component.html'
})
export class GalleryGroupManageDeleteDialogComponent {
    galleryGroup: IGalleryGroupManage;

    constructor(
        private galleryGroupService: GalleryGroupManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.galleryGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'galleryGroupListModification',
                content: 'Deleted an galleryGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gallery-group-manage-delete-popup',
    template: ''
})
export class GalleryGroupManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ galleryGroup }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GalleryGroupManageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.galleryGroup = galleryGroup;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
