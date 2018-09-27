import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStripeCustomerManage } from 'app/shared/model/stripe-customer-manage.model';
import { StripeCustomerManageService } from './stripe-customer-manage.service';

@Component({
    selector: 'jhi-stripe-customer-manage-delete-dialog',
    templateUrl: './stripe-customer-manage-delete-dialog.component.html'
})
export class StripeCustomerManageDeleteDialogComponent {
    stripeCustomer: IStripeCustomerManage;

    constructor(
        private stripeCustomerService: StripeCustomerManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stripeCustomerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stripeCustomerListModification',
                content: 'Deleted an stripeCustomer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stripe-customer-manage-delete-popup',
    template: ''
})
export class StripeCustomerManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stripeCustomer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StripeCustomerManageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.stripeCustomer = stripeCustomer;
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
