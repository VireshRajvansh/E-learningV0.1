import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaxRateManage } from 'app/shared/model/tax-rate-manage.model';
import { TaxRateManageService } from './tax-rate-manage.service';

@Component({
    selector: 'jhi-tax-rate-manage-delete-dialog',
    templateUrl: './tax-rate-manage-delete-dialog.component.html'
})
export class TaxRateManageDeleteDialogComponent {
    taxRate: ITaxRateManage;

    constructor(private taxRateService: TaxRateManageService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taxRateService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'taxRateListModification',
                content: 'Deleted an taxRate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tax-rate-manage-delete-popup',
    template: ''
})
export class TaxRateManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ taxRate }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TaxRateManageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.taxRate = taxRate;
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
