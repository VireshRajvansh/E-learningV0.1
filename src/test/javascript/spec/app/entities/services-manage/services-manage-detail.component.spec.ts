/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { ServicesManageDetailComponent } from 'app/entities/services-manage/services-manage-detail.component';
import { ServicesManage } from 'app/shared/model/services-manage.model';

describe('Component Tests', () => {
    describe('ServicesManage Management Detail Component', () => {
        let comp: ServicesManageDetailComponent;
        let fixture: ComponentFixture<ServicesManageDetailComponent>;
        const route = ({ data: of({ services: new ServicesManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [ServicesManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ServicesManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ServicesManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.services).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
