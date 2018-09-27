import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuizAnsManage } from 'app/shared/model/quiz-ans-manage.model';
import { QuizAnsManageService } from './quiz-ans-manage.service';

@Component({
    selector: 'jhi-quiz-ans-manage-delete-dialog',
    templateUrl: './quiz-ans-manage-delete-dialog.component.html'
})
export class QuizAnsManageDeleteDialogComponent {
    quizAns: IQuizAnsManage;

    constructor(private quizAnsService: QuizAnsManageService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.quizAnsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'quizAnsListModification',
                content: 'Deleted an quizAns'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-quiz-ans-manage-delete-popup',
    template: ''
})
export class QuizAnsManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ quizAns }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QuizAnsManageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.quizAns = quizAns;
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
