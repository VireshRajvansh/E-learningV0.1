/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { CourseManageDetailComponent } from 'app/entities/course-manage/course-manage-detail.component';
import { CourseManage } from 'app/shared/model/course-manage.model';

describe('Component Tests', () => {
    describe('CourseManage Management Detail Component', () => {
        let comp: CourseManageDetailComponent;
        let fixture: ComponentFixture<CourseManageDetailComponent>;
        const route = ({ data: of({ course: new CourseManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CourseManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CourseManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CourseManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.course).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
