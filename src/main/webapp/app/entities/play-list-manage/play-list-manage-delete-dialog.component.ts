import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlayListManage } from 'app/shared/model/play-list-manage.model';
import { PlayListManageService } from './play-list-manage.service';

@Component({
    selector: 'jhi-play-list-manage-delete-dialog',
    templateUrl: './play-list-manage-delete-dialog.component.html'
})
export class PlayListManageDeleteDialogComponent {
    playList: IPlayListManage;

    constructor(
        private playListService: PlayListManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.playListService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'playListListModification',
                content: 'Deleted an playList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-play-list-manage-delete-popup',
    template: ''
})
export class PlayListManageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ playList }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PlayListManageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.playList = playList;
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
