/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { StripeTransactionManageDetailComponent } from 'app/entities/stripe-transaction-manage/stripe-transaction-manage-detail.component';
import { StripeTransactionManage } from 'app/shared/model/stripe-transaction-manage.model';

describe('Component Tests', () => {
    describe('StripeTransactionManage Management Detail Component', () => {
        let comp: StripeTransactionManageDetailComponent;
        let fixture: ComponentFixture<StripeTransactionManageDetailComponent>;
        const route = ({ data: of({ stripeTransaction: new StripeTransactionManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripeTransactionManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StripeTransactionManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StripeTransactionManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stripeTransaction).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
