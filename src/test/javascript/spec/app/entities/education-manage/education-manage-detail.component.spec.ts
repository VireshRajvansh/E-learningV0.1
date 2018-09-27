/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { EducationManageDetailComponent } from 'app/entities/education-manage/education-manage-detail.component';
import { EducationManage } from 'app/shared/model/education-manage.model';

describe('Component Tests', () => {
    describe('EducationManage Management Detail Component', () => {
        let comp: EducationManageDetailComponent;
        let fixture: ComponentFixture<EducationManageDetailComponent>;
        const route = ({ data: of({ education: new EducationManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [EducationManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EducationManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EducationManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.education).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
