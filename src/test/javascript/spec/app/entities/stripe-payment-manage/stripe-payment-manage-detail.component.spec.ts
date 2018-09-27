/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { StripePaymentManageDetailComponent } from 'app/entities/stripe-payment-manage/stripe-payment-manage-detail.component';
import { StripePaymentManage } from 'app/shared/model/stripe-payment-manage.model';

describe('Component Tests', () => {
    describe('StripePaymentManage Management Detail Component', () => {
        let comp: StripePaymentManageDetailComponent;
        let fixture: ComponentFixture<StripePaymentManageDetailComponent>;
        const route = ({ data: of({ stripePayment: new StripePaymentManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripePaymentManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StripePaymentManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StripePaymentManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stripePayment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
