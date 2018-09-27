import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArticleManage } from 'app/shared/model/article-manage.model';

@Component({
    selector: 'jhi-article-manage-detail',
    templateUrl: './article-manage-detail.component.html'
})
export class ArticleManageDetailComponent implements OnInit {
    article: IArticleManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ article }) => {
            this.article = article;
        });
    }

    previousState() {
        window.history.back();
    }
}
