/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { QuizAnsManageUpdateComponent } from 'app/entities/quiz-ans-manage/quiz-ans-manage-update.component';
import { QuizAnsManageService } from 'app/entities/quiz-ans-manage/quiz-ans-manage.service';
import { QuizAnsManage } from 'app/shared/model/quiz-ans-manage.model';

describe('Component Tests', () => {
    describe('QuizAnsManage Management Update Component', () => {
        let comp: QuizAnsManageUpdateComponent;
        let fixture: ComponentFixture<QuizAnsManageUpdateComponent>;
        let service: QuizAnsManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [QuizAnsManageUpdateComponent]
            })
                .overrideTemplate(QuizAnsManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QuizAnsManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuizAnsManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new QuizAnsManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.quizAns = entity;
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
                    const entity = new QuizAnsManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.quizAns = entity;
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
