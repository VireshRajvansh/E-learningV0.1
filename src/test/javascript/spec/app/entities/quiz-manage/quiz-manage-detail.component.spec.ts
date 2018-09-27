/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { QuizManageDetailComponent } from 'app/entities/quiz-manage/quiz-manage-detail.component';
import { QuizManage } from 'app/shared/model/quiz-manage.model';

describe('Component Tests', () => {
    describe('QuizManage Management Detail Component', () => {
        let comp: QuizManageDetailComponent;
        let fixture: ComponentFixture<QuizManageDetailComponent>;
        const route = ({ data: of({ quiz: new QuizManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [QuizManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(QuizManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QuizManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.quiz).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
