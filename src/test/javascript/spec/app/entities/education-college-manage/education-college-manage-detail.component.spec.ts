/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { EducationCollegeManageDetailComponent } from 'app/entities/education-college-manage/education-college-manage-detail.component';
import { EducationCollegeManage } from 'app/shared/model/education-college-manage.model';

describe('Component Tests', () => {
    describe('EducationCollegeManage Management Detail Component', () => {
        let comp: EducationCollegeManageDetailComponent;
        let fixture: ComponentFixture<EducationCollegeManageDetailComponent>;
        const route = ({ data: of({ educationCollege: new EducationCollegeManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [EducationCollegeManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EducationCollegeManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EducationCollegeManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.educationCollege).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
