/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { TaxRateManageDetailComponent } from 'app/entities/tax-rate-manage/tax-rate-manage-detail.component';
import { TaxRateManage } from 'app/shared/model/tax-rate-manage.model';

describe('Component Tests', () => {
    describe('TaxRateManage Management Detail Component', () => {
        let comp: TaxRateManageDetailComponent;
        let fixture: ComponentFixture<TaxRateManageDetailComponent>;
        const route = ({ data: of({ taxRate: new TaxRateManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [TaxRateManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TaxRateManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaxRateManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.taxRate).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
