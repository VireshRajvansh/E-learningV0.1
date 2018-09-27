import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserSignUpByReferralCodeManage } from 'app/shared/model/user-sign-up-by-referral-code-manage.model';
import { UserSignUpByReferralCodeManageService } from './user-sign-up-by-referral-code-manage.service';

@Component({
    selector: 'jhi-user-sign-up-by-referral-code-manage-delete-dialog',
    templateUrl: './user-sign-up-by-referral-code-manage-delete-dialog.component.html'
})
export class UserSignUpByReferralCodeManageDeleteDialogComponent {
    userSignUpByReferralCode: IUserSignUpByReferralCodeManage;

    constructor(
        private userSignUpByReferralCodeService: UserSignUpByReferralCodeManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userSignUpByReferralCodeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userSignUpByReferralCodeListModification',
                content: 'Deleted an userSignUpByReferralCode'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-sign-up-by-referral-code-manage-delete-popup',
    template: ''
})
export class UserSignUpByReferralCodeManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userSignUpByReferralCode }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserSignUpByReferralCodeManageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.userSignUpByReferralCode = userSignUpByReferralCode;
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
