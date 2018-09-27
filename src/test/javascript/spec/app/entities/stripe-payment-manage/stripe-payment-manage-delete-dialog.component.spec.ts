/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { StripePaymentManageDeleteDialogComponent } from 'app/entities/stripe-payment-manage/stripe-payment-manage-delete-dialog.component';
import { StripePaymentManageService } from 'app/entities/stripe-payment-manage/stripe-payment-manage.service';

describe('Component Tests', () => {
    describe('StripePaymentManage Management Delete Component', () => {
        let comp: StripePaymentManageDeleteDialogComponent;
        let fixture: ComponentFixture<StripePaymentManageDeleteDialogComponent>;
        let service: StripePaymentManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripePaymentManageDeleteDialogComponent]
            })
                .overrideTemplate(StripePaymentManageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StripePaymentManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripePaymentManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
