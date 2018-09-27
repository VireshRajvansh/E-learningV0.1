/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { StripePaymentManageUpdateComponent } from 'app/entities/stripe-payment-manage/stripe-payment-manage-update.component';
import { StripePaymentManageService } from 'app/entities/stripe-payment-manage/stripe-payment-manage.service';
import { StripePaymentManage } from 'app/shared/model/stripe-payment-manage.model';

describe('Component Tests', () => {
    describe('StripePaymentManage Management Update Component', () => {
        let comp: StripePaymentManageUpdateComponent;
        let fixture: ComponentFixture<StripePaymentManageUpdateComponent>;
        let service: StripePaymentManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripePaymentManageUpdateComponent]
            })
                .overrideTemplate(StripePaymentManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StripePaymentManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripePaymentManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StripePaymentManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stripePayment = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StripePaymentManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stripePayment = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
