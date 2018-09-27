import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServicesManage } from 'app/shared/model/services-manage.model';
import { ServicesManageService } from './services-manage.service';

@Component({
    selector: 'jhi-services-manage-delete-dialog',
    templateUrl: './services-manage-delete-dialog.component.html'
})
export class ServicesManageDeleteDialogComponent {
    services: IServicesManage;

    constructor(
        private servicesService: ServicesManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.servicesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'servicesListModification',
                content: 'Deleted an services'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-services-manage-delete-popup',
    template: ''
})
export class ServicesManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ services }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ServicesManageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.services = services;
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
