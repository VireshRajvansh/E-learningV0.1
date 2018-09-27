import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGalleryManage } from 'app/shared/model/gallery-manage.model';
import { GalleryManageService } from './gallery-manage.service';

@Component({
    selector: 'jhi-gallery-manage-delete-dialog',
    templateUrl: './gallery-manage-delete-dialog.component.html'
})
export class GalleryManageDeleteDialogComponent {
    gallery: IGalleryManage;

    constructor(private galleryService: GalleryManageService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.galleryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'galleryListModification',
                content: 'Deleted an gallery'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gallery-manage-delete-popup',
    template: ''
})
export class GalleryManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gallery }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GalleryManageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gallery = gallery;
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
