/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { QuizAnsManageDetailComponent } from 'app/entities/quiz-ans-manage/quiz-ans-manage-detail.component';
import { QuizAnsManage } from 'app/shared/model/quiz-ans-manage.model';

describe('Component Tests', () => {
    describe('QuizAnsManage Management Detail Component', () => {
        let comp: QuizAnsManageDetailComponent;
        let fixture: ComponentFixture<QuizAnsManageDetailComponent>;
        const route = ({ data: of({ quizAns: new QuizAnsManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [QuizAnsManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(QuizAnsManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QuizAnsManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.quizAns).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
