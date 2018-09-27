/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { StudentManageDetailComponent } from 'app/entities/student-manage/student-manage-detail.component';
import { StudentManage } from 'app/shared/model/student-manage.model';

describe('Component Tests', () => {
    describe('StudentManage Management Detail Component', () => {
        let comp: StudentManageDetailComponent;
        let fixture: ComponentFixture<StudentManageDetailComponent>;
        const route = ({ data: of({ student: new StudentManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StudentManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StudentManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StudentManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.student).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
