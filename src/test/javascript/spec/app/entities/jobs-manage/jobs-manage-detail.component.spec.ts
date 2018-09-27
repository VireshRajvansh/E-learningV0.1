/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { JobsManageDetailComponent } from 'app/entities/jobs-manage/jobs-manage-detail.component';
import { JobsManage } from 'app/shared/model/jobs-manage.model';

describe('Component Tests', () => {
    describe('JobsManage Management Detail Component', () => {
        let comp: JobsManageDetailComponent;
        let fixture: ComponentFixture<JobsManageDetailComponent>;
        const route = ({ data: of({ jobs: new JobsManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [JobsManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JobsManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobsManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.jobs).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
