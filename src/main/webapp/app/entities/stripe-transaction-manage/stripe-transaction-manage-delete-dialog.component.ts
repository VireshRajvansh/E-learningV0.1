import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStripeTransactionManage } from 'app/shared/model/stripe-transaction-manage.model';
import { StripeTransactionManageService } from './stripe-transaction-manage.service';

@Component({
    selector: 'jhi-stripe-transaction-manage-delete-dialog',
    templateUrl: './stripe-transaction-manage-delete-dialog.component.html'
})
export class StripeTransactionManageDeleteDialogComponent {
    stripeTransaction: IStripeTransactionManage;

    constructor(
        private stripeTransactionService: StripeTransactionManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stripeTransactionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stripeTransactionListModification',
                content: 'Deleted an stripeTransaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stripe-transaction-manage-delete-popup',
    template: ''
})
export class StripeTransactionManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stripeTransaction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StripeTransactionManageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.stripeTransaction = stripeTransaction;
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
