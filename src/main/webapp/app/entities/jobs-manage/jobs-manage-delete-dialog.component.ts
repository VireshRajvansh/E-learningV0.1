import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobsManage } from 'app/shared/model/jobs-manage.model';
import { JobsManageService } from './jobs-manage.service';

@Component({
    selector: 'jhi-jobs-manage-delete-dialog',
    templateUrl: './jobs-manage-delete-dialog.component.html'
})
export class JobsManageDeleteDialogComponent {
    jobs: IJobsManage;

    constructor(private jobsService: JobsManageService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jobsListModification',
                content: 'Deleted an jobs'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jobs-manage-delete-popup',
    template: ''
})
export class JobsManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobs }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(JobsManageDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.jobs = jobs;
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
