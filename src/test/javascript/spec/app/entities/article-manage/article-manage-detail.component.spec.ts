/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { ArticleManageDetailComponent } from 'app/entities/article-manage/article-manage-detail.component';
import { ArticleManage } from 'app/shared/model/article-manage.model';

describe('Component Tests', () => {
    describe('ArticleManage Management Detail Component', () => {
        let comp: ArticleManageDetailComponent;
        let fixture: ComponentFixture<ArticleManageDetailComponent>;
        const route = ({ data: of({ article: new ArticleManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [ArticleManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ArticleManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ArticleManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.article).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
