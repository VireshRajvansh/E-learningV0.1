/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { StripeCustomerManageDetailComponent } from 'app/entities/stripe-customer-manage/stripe-customer-manage-detail.component';
import { StripeCustomerManage } from 'app/shared/model/stripe-customer-manage.model';

describe('Component Tests', () => {
    describe('StripeCustomerManage Management Detail Component', () => {
        let comp: StripeCustomerManageDetailComponent;
        let fixture: ComponentFixture<StripeCustomerManageDetailComponent>;
        const route = ({ data: of({ stripeCustomer: new StripeCustomerManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripeCustomerManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StripeCustomerManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StripeCustomerManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stripeCustomer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
