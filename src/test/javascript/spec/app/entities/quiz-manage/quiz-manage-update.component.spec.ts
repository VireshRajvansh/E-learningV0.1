/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { QuizManageUpdateComponent } from 'app/entities/quiz-manage/quiz-manage-update.component';
import { QuizManageService } from 'app/entities/quiz-manage/quiz-manage.service';
import { QuizManage } from 'app/shared/model/quiz-manage.model';

describe('Component Tests', () => {
    describe('QuizManage Management Update Component', () => {
        let comp: QuizManageUpdateComponent;
        let fixture: ComponentFixture<QuizManageUpdateComponent>;
        let service: QuizManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [QuizManageUpdateComponent]
            })
                .overrideTemplate(QuizManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QuizManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuizManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new QuizManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.quiz = entity;
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
                    const entity = new QuizManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.quiz = entity;
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
