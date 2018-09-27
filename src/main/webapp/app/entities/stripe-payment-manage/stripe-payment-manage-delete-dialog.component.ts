import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStripePaymentManage } from 'app/shared/model/stripe-payment-manage.model';
import { StripePaymentManageService } from './stripe-payment-manage.service';

@Component({
    selector: 'jhi-stripe-payment-manage-delete-dialog',
    templateUrl: './stripe-payment-manage-delete-dialog.component.html'
})
export class StripePaymentManageDeleteDialogComponent {
    stripePayment: IStripePaymentManage;

    constructor(
        private stripePaymentService: StripePaymentManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stripePaymentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stripePaymentListModification',
                content: 'Deleted an stripePayment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stripe-payment-manage-delete-popup',
    template: ''
})
export class StripePaymentManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stripePayment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StripePaymentManageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.stripePayment = stripePayment;
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
