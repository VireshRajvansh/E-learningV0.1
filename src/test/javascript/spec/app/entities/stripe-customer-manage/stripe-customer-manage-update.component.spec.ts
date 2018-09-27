/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { StripeCustomerManageUpdateComponent } from 'app/entities/stripe-customer-manage/stripe-customer-manage-update.component';
import { StripeCustomerManageService } from 'app/entities/stripe-customer-manage/stripe-customer-manage.service';
import { StripeCustomerManage } from 'app/shared/model/stripe-customer-manage.model';

describe('Component Tests', () => {
    describe('StripeCustomerManage Management Update Component', () => {
        let comp: StripeCustomerManageUpdateComponent;
        let fixture: ComponentFixture<StripeCustomerManageUpdateComponent>;
        let service: StripeCustomerManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripeCustomerManageUpdateComponent]
            })
                .overrideTemplate(StripeCustomerManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StripeCustomerManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripeCustomerManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StripeCustomerManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stripeCustomer = entity;
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
                    const entity = new StripeCustomerManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stripeCustomer = entity;
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
