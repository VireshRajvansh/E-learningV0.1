import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlayListManage } from 'app/shared/model/play-list-manage.model';

@Component({
    selector: 'jhi-play-list-manage-detail',
    templateUrl: './play-list-manage-detail.component.html'
})
export class PlayListManageDetailComponent implements OnInit {
    playList: IPlayListManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ playList }) => {
            this.playList = playList;
        });
    }

    previousState() {
        window.history.back();
    }
}
