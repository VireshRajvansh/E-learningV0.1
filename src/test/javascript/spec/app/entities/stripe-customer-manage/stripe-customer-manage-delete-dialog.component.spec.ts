/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { StripeCustomerManageDeleteDialogComponent } from 'app/entities/stripe-customer-manage/stripe-customer-manage-delete-dialog.component';
import { StripeCustomerManageService } from 'app/entities/stripe-customer-manage/stripe-customer-manage.service';

describe('Component Tests', () => {
    describe('StripeCustomerManage Management Delete Component', () => {
        let comp: StripeCustomerManageDeleteDialogComponent;
        let fixture: ComponentFixture<StripeCustomerManageDeleteDialogComponent>;
        let service: StripeCustomerManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripeCustomerManageDeleteDialogComponent]
            })
                .overrideTemplate(StripeCustomerManageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StripeCustomerManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripeCustomerManageService);
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
