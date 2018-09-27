import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICardExpiryReminderManage } from 'app/shared/model/card-expiry-reminder-manage.model';
import { CardExpiryReminderManageService } from './card-expiry-reminder-manage.service';

@Component({
    selector: 'jhi-card-expiry-reminder-manage-delete-dialog',
    templateUrl: './card-expiry-reminder-manage-delete-dialog.component.html'
})
export class CardExpiryReminderManageDeleteDialogComponent {
    cardExpiryReminder: ICardExpiryReminderManage;

    constructor(
        private cardExpiryReminderService: CardExpiryReminderManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cardExpiryReminderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cardExpiryReminderListModification',
                content: 'Deleted an cardExpiryReminder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-card-expiry-reminder-manage-delete-popup',
    template: ''
})
export class CardExpiryReminderManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cardExpiryReminder }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CardExpiryReminderManageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.cardExpiryReminder = cardExpiryReminder;
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
