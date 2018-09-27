/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { ArticleManageUpdateComponent } from 'app/entities/article-manage/article-manage-update.component';
import { ArticleManageService } from 'app/entities/article-manage/article-manage.service';
import { ArticleManage } from 'app/shared/model/article-manage.model';

describe('Component Tests', () => {
    describe('ArticleManage Management Update Component', () => {
        let comp: ArticleManageUpdateComponent;
        let fixture: ComponentFixture<ArticleManageUpdateComponent>;
        let service: ArticleManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [ArticleManageUpdateComponent]
            })
                .overrideTemplate(ArticleManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ArticleManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ArticleManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.article = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ArticleManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.article = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
