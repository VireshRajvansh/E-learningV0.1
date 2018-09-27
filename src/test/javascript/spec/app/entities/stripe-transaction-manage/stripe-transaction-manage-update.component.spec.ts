/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { StripeTransactionManageUpdateComponent } from 'app/entities/stripe-transaction-manage/stripe-transaction-manage-update.component';
import { StripeTransactionManageService } from 'app/entities/stripe-transaction-manage/stripe-transaction-manage.service';
import { StripeTransactionManage } from 'app/shared/model/stripe-transaction-manage.model';

describe('Component Tests', () => {
    describe('StripeTransactionManage Management Update Component', () => {
        let comp: StripeTransactionManageUpdateComponent;
        let fixture: ComponentFixture<StripeTransactionManageUpdateComponent>;
        let service: StripeTransactionManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripeTransactionManageUpdateComponent]
            })
                .overrideTemplate(StripeTransactionManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StripeTransactionManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripeTransactionManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StripeTransactionManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stripeTransaction = entity;
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
                    const entity = new StripeTransactionManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stripeTransaction = entity;
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
