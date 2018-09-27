/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { TeacherManageDetailComponent } from 'app/entities/teacher-manage/teacher-manage-detail.component';
import { TeacherManage } from 'app/shared/model/teacher-manage.model';

describe('Component Tests', () => {
    describe('TeacherManage Management Detail Component', () => {
        let comp: TeacherManageDetailComponent;
        let fixture: ComponentFixture<TeacherManageDetailComponent>;
        const route = ({ data: of({ teacher: new TeacherManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [TeacherManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TeacherManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeacherManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.teacher).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
