/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { CityManageDetailComponent } from 'app/entities/city-manage/city-manage-detail.component';
import { CityManage } from 'app/shared/model/city-manage.model';

describe('Component Tests', () => {
    describe('CityManage Management Detail Component', () => {
        let comp: CityManageDetailComponent;
        let fixture: ComponentFixture<CityManageDetailComponent>;
        const route = ({ data: of({ city: new CityManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CityManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CityManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CityManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.city).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
