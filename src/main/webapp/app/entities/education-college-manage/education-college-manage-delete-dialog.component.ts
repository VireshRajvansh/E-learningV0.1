import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEducationCollegeManage } from 'app/shared/model/education-college-manage.model';
import { EducationCollegeManageService } from './education-college-manage.service';

@Component({
    selector: 'jhi-education-college-manage-delete-dialog',
    templateUrl: './education-college-manage-delete-dialog.component.html'
})
export class EducationCollegeManageDeleteDialogComponent {
    educationCollege: IEducationCollegeManage;

    constructor(
        private educationCollegeService: EducationCollegeManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.educationCollegeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'educationCollegeListModification',
                content: 'Deleted an educationCollege'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-education-college-manage-delete-popup',
    template: ''
})
export class EducationCollegeManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ educationCollege }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EducationCollegeManageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.educationCollege = educationCollege;
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
